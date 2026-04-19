export type ChatRole = "user" | "assistant";

export interface ChatHistoryMessage {
	role: ChatRole;
	content: string;
}

export interface ChatRequest {
	message: string;
	history: ChatHistoryMessage[];
}

export type RetrievalModel = "deepseek" | "gemini";

export interface ModelChatRequest extends ChatRequest {
	model: RetrievalModel;
}

interface ChatResponse {
	response: string;
}

interface ModelChatResponse extends ChatResponse {
	model?: string;
}

function normalizeBaseUrl(rawBaseUrl?: string) {
	const fallback = "https://nyaya.orbloop.in";
	const base = (rawBaseUrl?.trim() || fallback).replace(/\/+$/, "");
	if (/^https?:\/\//i.test(base)) {
		return base;
	}
	return `https://${base}`;
}

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_LEGAL_CHAT_API_BASE_URL);

function buildUrl(path: string) {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${API_BASE_URL}${normalizedPath}`;
}

export async function chat(request: ChatRequest, signal?: AbortSignal): Promise<string> {
	const res = await fetch(buildUrl("/chat"), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
		signal,
	});

	if (!res.ok) {
		throw new Error(`Chat request failed with status ${res.status}`);
	}

	const data = (await res.json()) as Partial<ChatResponse>;
	if (typeof data.response !== "string") {
		throw new Error("Invalid response format from /chat");
	}

	return data.response;
}

export async function modelChat(request: ModelChatRequest, signal?: AbortSignal): Promise<string> {
	const res = await fetch(buildUrl("/modelchat"), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
		signal,
	});

	if (!res.ok) {
		throw new Error(`Model chat request failed with status ${res.status}`);
	}

	const data = (await res.json()) as Partial<ModelChatResponse>;
	if (typeof data.response !== "string") {
		throw new Error("Invalid response format from /modelchat");
	}

	return data.response;
}

function extractTextChunk(rawData: string): string {
	const trimmed = rawData.trim();
	if (!trimmed || trimmed === "[DONE]") return "";

	try {
		const parsed = JSON.parse(trimmed) as Record<string, unknown>;
		if (typeof parsed.token === "string") return parsed.token;
		if (typeof parsed.delta === "string") return parsed.delta;
		if (typeof parsed.response === "string") return parsed.response;
		if (typeof parsed.content === "string") return parsed.content;
		if (typeof parsed.text === "string") return parsed.text;
		return "";
	} catch {
		return trimmed;
	}
}

function parseSseEventBlock(block: string) {
	let eventName = "message";
	const dataLines: string[] = [];
	let sawSseField = false;

	for (const rawLine of block.split(/\r?\n/)) {
		if (!rawLine || rawLine.startsWith(":")) continue;

		const separatorIndex = rawLine.indexOf(":");
		const field = separatorIndex === -1 ? rawLine.trim() : rawLine.slice(0, separatorIndex).trim();
		let value = separatorIndex === -1 ? "" : rawLine.slice(separatorIndex + 1);
		if (value.startsWith(" ")) value = value.slice(1);

		switch (field) {
			case "event":
				eventName = value || "message";
				sawSseField = true;
				break;
			case "data":
				dataLines.push(value);
				sawSseField = true;
				break;
			case "id":
			case "retry":
				sawSseField = true;
				break;
			default:
				break;
		}
	}

	// Fallback for non-SSE plain text streams.
	if (!sawSseField && block.trim()) {
		dataLines.push(block.trim());
	}

	return {
		eventName: eventName.toLowerCase(),
		data: dataLines.join("\n"),
	};
}

export async function chatStream(
	request: ChatRequest,
	onChunk: (chunk: string) => void,
	signal?: AbortSignal,
): Promise<string> {
	const res = await fetch(buildUrl("/chat/stream"), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "text/event-stream, application/json, text/plain",
		},
		body: JSON.stringify(request),
		signal,
	});

	if (!res.ok) {
		throw new Error(`Chat stream request failed with status ${res.status}`);
	}

	if (!res.body) {
		const fallbackData = (await res.json()) as Partial<ChatResponse>;
		const fallbackText = typeof fallbackData.response === "string" ? fallbackData.response : "";
		if (fallbackText) onChunk(fallbackText);
		return fallbackText;
	}

	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	let fullText = "";
	let shouldStop = false;

	const processEventBlock = (block: string) => {
		const { eventName, data } = parseSseEventBlock(block);
		const payload = data.trim();
		if (!payload) return;

		if (eventName === "done" && payload === "[DONE]") {
			shouldStop = true;
			return;
		}

		const chunk = extractTextChunk(payload);
		if (!chunk) return;

		fullText += chunk;
		onChunk(chunk);
	};

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, { stream: true });
		const eventBlocks = buffer.split(/\r?\n\r?\n/);
		buffer = eventBlocks.pop() ?? "";

		for (const block of eventBlocks) {
			processEventBlock(block);
			if (shouldStop) {
				await reader.cancel();
				return fullText;
			}
		}
	}

	if (buffer.trim()) {
		processEventBlock(buffer);
	}

	return fullText;
}
