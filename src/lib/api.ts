export type ChatRole = "user" | "assistant";

export interface ChatHistoryMessage {
	role: ChatRole;
	content: string;
}

export interface ChatRequest {
	message: string;
	history: ChatHistoryMessage[];
}

interface ChatResponse {
	response: string;
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

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split(/\r?\n/);
		buffer = lines.pop() ?? "";

		for (const line of lines) {
			const payload = line.startsWith("data:") ? line.slice(5).trim() : line.trim();
			const chunk = extractTextChunk(payload);
			if (!chunk) continue;

			fullText += chunk;
			onChunk(chunk);
		}
	}

	const trailing = extractTextChunk(buffer);
	if (trailing) {
		fullText += trailing;
		onChunk(trailing);
	}

	return fullText;
}
