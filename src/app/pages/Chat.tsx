import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import logoImg from "../../imports/new_logo.png";
import { GravityStarsBackground } from "../components/GravityStars";
import { chat, modelChat, rlmChatStream, DEFAULT_RLM_MODEL, type RetrievalModel, type RlmStreamEvent } from "../../lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
  files?: string[];
}

type ModelChoice = "auto" | RetrievalModel;

type MarkdownHeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type MarkdownBlock =
  | { type: "heading"; level: number; content: string }
  | { type: "paragraph"; content: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "blockquote"; content: string[] }
  | { type: "divider" };

// ─── Sample suggestions shown on empty state ─────────────────────────────────
const suggestions = [
  "What is the punishment for theft?",
  "Is theft a bailable offence?",
  "what if civilian beats policemen?",
  "Can a Traffic Police take my car keys if I am caught drunk driving?",
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function getTime() {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m < 10 ? "0" + m : m} ${ampm}`;
}

function prettifyCompactLegalText(input: string) {
  const camelBoundaries = (input.match(/[a-z][A-Z]/g) || []).length;
  const spaceRatio = input.length > 0 ? (input.match(/\s/g) || []).length / input.length : 0;
  const looksCollapsed = camelBoundaries >= 6 || spaceRatio < 0.08;

  if (!looksCollapsed) {
    return input.trim();
  }

  return input
    .replace(/\r\n?/g, "\n")
    .replace(/##(?=[A-Za-z])/g, "## ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([.!?])(\w)/g, "$1 $2")
    .replace(/(Summary|Key\s*Points|Source\s*Quote|Conclusion)\s*:/gi, "\n$1:\n")
    .replace(/-\s*(?=[A-Za-z])/g, "\n- ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatAssistantForDisplay(input: string) {
  const lines = input.split(/\r?\n/);
  let numberedPoint = 0;

  const formattedLines = lines.map((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      numberedPoint = 0;
      return "";
    }

    const headingMatch = line.match(/^#{1,6}\s*(.+)$/);
    if (headingMatch) {
      numberedPoint = 0;
      const heading = headingMatch[1].trim().replace(/\s*:+\s*$/, "");
      return `${heading}:`;
    }

    const bulletMatch = line.match(/^-\s+(.+)$/);
    if (bulletMatch) {
      numberedPoint += 1;
      return `${numberedPoint}. ${bulletMatch[1].trim()}`;
    }

    numberedPoint = 0;
    return line;
  });

  return formattedLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function cleanAssistantResponse(raw: string) {
  const withoutDoneEvent = raw.replace(/event\s*:\s*done/gi, "").trim();

  const finalAnswerMatch = withoutDoneEvent.match(/final\s*answer\s*:\s*/i);
  if (finalAnswerMatch && finalAnswerMatch.index !== undefined) {
    const finalOnly = withoutDoneEvent.slice(finalAnswerMatch.index + finalAnswerMatch[0].length).trim();
    if (finalOnly) return formatAssistantForDisplay(prettifyCompactLegalText(finalOnly));
  }

  const filteredLines = withoutDoneEvent
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .filter(line => !/^(thought|action|actioninput|observation)\s*:/i.test(line));

  return formatAssistantForDisplay(prettifyCompactLegalText(filteredLines.join("\n")));
}

function parseStreamMessage(event: RlmStreamEvent) {
  if (typeof event.message === "string" && event.message.trim()) return event.message.trim();
  if (typeof event.response === "string" && event.response.trim()) return event.response.trim();
  return "";
}

function parseInlineMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  let keyIndex = 0;

  const pushText = (value: string) => {
    if (value) {
      parts.push(value);
    }
  };

  while (cursor < text.length) {
    const remaining = text.slice(cursor);

    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a key={`link-${keyIndex++}`} href={linkMatch[2]} target="_blank" rel="noreferrer" style={{ color: "#C5A059", textDecoration: "underline" }}>
          {linkMatch[1]}
        </a>,
      );
      cursor += linkMatch[0].length;
      continue;
    }

    const strongMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (strongMatch) {
      parts.push(<strong key={`strong-${keyIndex++}`}>{strongMatch[1]}</strong>);
      cursor += strongMatch[0].length;
      continue;
    }

    const emMatch = remaining.match(/^\*([^*]+)\*/);
    if (emMatch) {
      parts.push(<em key={`em-${keyIndex++}`}>{emMatch[1]}</em>);
      cursor += emMatch[0].length;
      continue;
    }

    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code key={`code-${keyIndex++}`} style={{ padding: "0.12rem 0.35rem", borderRadius: 6, background: "rgba(197,160,89,0.12)", color: "#f0ddbb" }}>
          {codeMatch[1]}
        </code>,
      );
      cursor += codeMatch[0].length;
      continue;
    }

    pushText(remaining[0]);
    cursor += 1;
  }

  return parts;
}

function splitMarkdownRows(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map(cell => cell.trim());
}

function isTableSeparator(line: string) {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line);
}

function parseMarkdownBlocks(input: string): MarkdownBlock[] {
  const lines = input.replace(/\r\n?/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];

  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (/^---+$/.test(line)) {
      blocks.push({ type: "divider" });
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({ type: "heading", level: headingMatch[1].length, content: headingMatch[2].trim() });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "blockquote", content: quoteLines });
      continue;
    }

    const tableLine = lines[index]?.trim() ?? "";
    const nextLine = lines[index + 1]?.trim() ?? "";
    if (tableLine.includes("|") && isTableSeparator(nextLine)) {
      const headers = splitMarkdownRows(tableLine);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length) {
        const rowLine = lines[index].trim();
        if (!rowLine || !rowLine.includes("|")) break;
        rows.push(splitMarkdownRows(rowLine));
        index += 1;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    const listMatch = line.match(/^(\d+\.|[-*])\s+(.+)$/);
    if (listMatch) {
      const ordered = Boolean(listMatch[1].match(/^\d+\.$/));
      const items: string[] = [];
      while (index < lines.length) {
        const current = lines[index].trim();
        const currentMatch = current.match(/^(\d+\.|[-*])\s+(.+)$/);
        if (!currentMatch || Boolean(currentMatch[1].match(/^\d+\.$/)) !== ordered) break;
        items.push(currentMatch[2].trim());
        index += 1;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (index < lines.length) {
      const current = lines[index].trim();
      const nextIsBlock = !current || /^#{1,6}\s+/.test(current) || /^>\s?/.test(current) || /^---+$/.test(current) || /^(\d+\.|[-*])\s+/.test(current) || (current.includes("|") && isTableSeparator(lines[index + 1]?.trim() ?? ""));
      if (nextIsBlock) break;
      paragraphLines.push(current);
      index += 1;
    }
    blocks.push({ type: "paragraph", content: paragraphLines.join(" ") });
  }

  return blocks;
}

function MarkdownContent({ content }: { content: string }) {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="assistant-markdown">
      {blocks.map((block, blockIndex) => {
        if (block.type === "divider") {
          return <hr key={blockIndex} className="assistant-markdown-divider" />;
        }

        if (block.type === "heading") {
          const headingLevel = Math.min(block.level, 6) as 1 | 2 | 3 | 4 | 5 | 6;
          const HeadingTag = `h${headingLevel}` as MarkdownHeadingTag;
          return (
            <HeadingTag key={blockIndex} className={`assistant-markdown-h assistant-markdown-h${Math.min(block.level, 6)}`}>
              {parseInlineMarkdown(block.content)}
            </HeadingTag>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote key={blockIndex} className="assistant-markdown-quote">
              {block.content.map((line, lineIndex) => (
                <p key={lineIndex}>{parseInlineMarkdown(line)}</p>
              ))}
            </blockquote>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag key={blockIndex} className={`assistant-markdown-list ${block.ordered ? "ordered" : "unordered"}`}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{parseInlineMarkdown(item)}</li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "table") {
          return (
            <div key={blockIndex} className="assistant-markdown-table-wrap">
              <table className="assistant-markdown-table">
                <thead>
                  <tr>
                    {block.headers.map((header, headerIndex) => (
                      <th key={headerIndex}>{parseInlineMarkdown(header)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {block.headers.map((_, cellIndex) => (
                        <td key={cellIndex}>{parseInlineMarkdown(row[cellIndex] ?? "")}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return <p key={blockIndex} className="assistant-markdown-p">{parseInlineMarkdown(block.content)}</p>;
      })}
    </div>
  );
}

// ─── Chat Message Bubble ──────────────────────────────────────────────────────
function UserBubble({ message }: { message: Message }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, animation: "fadeSlideUp 0.3s ease" }}>
      <div style={{
        background: "#1e1e1e",
        border: "1px solid rgba(197,160,89,0.15)",
        borderRadius: "18px 18px 4px 18px",
        padding: "14px 20px",
        maxWidth: "72%",
        fontSize: 15,
        lineHeight: 1.65,
        color: "#e8e4de",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {message.content}
      </div>
      <span style={{ fontSize: 11, color: "rgba(200,195,188,0.45)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>
        {message.time}
      </span>
      {message.files?.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 6, maxWidth: "72%" }}>
          {message.files.map(file => (
            <span
              key={file}
              style={{
                padding: "4px 8px",
                borderRadius: 999,
                border: "1px solid rgba(197,160,89,0.2)",
                background: "rgba(197,160,89,0.08)",
                color: "rgba(232,228,222,0.82)",
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {file}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BotBubble({ message }: { message: Message }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, animation: "fadeSlideUp 0.3s ease" }}>
      {/* Bot label */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 26, height: 26,
          background: "rgba(197,160,89,0.15)",
          border: "1px solid rgba(197,160,89,0.3)",
          borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", padding: 3,
        }}>
          <img src={logoImg} alt="NyayaBot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#C5A059", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase" }}>
          NyayaBot
        </span>
      </div>
      {/* Bubble */}
      <div style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "4px 18px 18px 18px",
        padding: "16px 18px",
        maxWidth: "100%",
        width: "100%",
        minWidth: 0,
        fontSize: 15,
        lineHeight: 1.75,
        color: "#d8d4ce",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "auto",
      }}>
        <MarkdownContent content={message.content} />
      </div>
      {/* Action row */}
      <div style={{ display: "flex", gap: 20, paddingLeft: 4 }}>
        {[["content_copy", "Copy"], ["share", "Share"]].map(([icon, label]) => (
          <button key={icon} style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "none", border: "none", cursor: "pointer",
            fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(197,160,89,0.55)", fontFamily: "'DM Sans', sans-serif",
            transition: "color 0.2s",
            fontWeight: 600,
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C5A059")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(197,160,89,0.55)")}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [rlmStatus, setRlmStatus] = useState<string | null>(null);
  const [rlmTurns, setRlmTurns] = useState<string[]>([]);
  const [rlmOutputs, setRlmOutputs] = useState<string[]>([]);
  const [rlmTraceOpen, setRlmTraceOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState<ModelChoice>("auto");
  const [mobileModelMenuOpen, setMobileModelMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mobileAttachInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const isEmpty = messages.length === 0;

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const clearUploadState = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (mobileAttachInputRef.current) mobileAttachInputRef.current.value = "";
  };

  const resetStreamState = () => {
    setRlmStatus(null);
    setRlmTurns([]);
    setRlmOutputs([]);
  };

  const handleFileSelection = (files: FileList | null) => {
    if (!files?.length) return;

    const nextFiles = Array.from(files);
    setSelectedFiles(prev => {
      const merged = [...prev];
      for (const file of nextFiles) {
        const isDuplicate = merged.some(existing => existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified);
        if (!isDuplicate) merged.push(file);
      }
      return merged;
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
    if (mobileAttachInputRef.current) mobileAttachInputRef.current.value = "";
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? inputText).trim();
    if (!content || isLoading) return;

    const uploadFiles = selectedFiles;
    const shouldUseRlm = uploadFiles.length > 0;

    const activeController = new AbortController();
    abortRef.current?.abort();
    abortRef.current = activeController;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content,
      time: getTime(),
      files: shouldUseRlm ? uploadFiles.map(file => file.name) : undefined,
    };
    const assistantId = Date.now() + 1;
    const assistantTime = getTime();

    setRequestError(null);
    setMobileModelMenuOpen(false);
    if (shouldUseRlm) {
      resetStreamState();
      setRlmTraceOpen(true);
    }
    setMessages(prev => [...prev, userMsg, { id: assistantId, role: "assistant", content: "", time: assistantTime }]);
    setInputText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsLoading(true);

    try {
      let response = "";

      if (shouldUseRlm) {
        response = await rlmChatStream(
          {
            question: content,
            files: uploadFiles,
            maxTurns: 10,
            model: DEFAULT_RLM_MODEL,
          },
          (event) => {
            const message = parseStreamMessage(event);

            if (event.event === "status" && message) {
              setRlmStatus(message);
            }

            if (event.event === "turn" && message) {
              setRlmTurns(prev => [...prev, message]);
            }

            if (event.event === "output" && message) {
              setRlmOutputs(prev => [...prev, message]);
            }

            if (event.event === "done") {
              setRlmStatus(message || "Completed");
            }

            if (event.event === "error" && message) {
              setRequestError(message);
            }
          },
          activeController.signal,
        );
      } else {
        const history = [...messages, userMsg].map(msg => ({
          role: msg.role,
          content: msg.content,
        }));

        response = selectedModel === "auto"
          ? await chat(
            {
              message: content,
              history,
            },
            activeController.signal,
          )
          : await modelChat(
            {
              message: content,
              history,
              model: selectedModel,
            },
            activeController.signal,
          );
      }

      const finalDisplayText = cleanAssistantResponse(response);

      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? { ...msg, content: finalDisplayText || response.trim() }
            : msg,
        ),
      );

      if (shouldUseRlm) {
        clearUploadState();
      }
    } catch (error) {
      const failureMessage = error instanceof Error && error.message
        ? error.message
        : "Could not reach the legal chat service. Please try again.";

      setRequestError(current => current ?? failureMessage);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? {
              ...msg,
              content: shouldUseRlm
                ? failureMessage
                : "I am unable to reach the legal knowledge service right now. Please try again in a moment.",
            }
            : msg,
        ),
      );
    } finally {
      if (abortRef.current === activeController) {
        abortRef.current = null;
      }
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#0D0D0D",
      color: "#e8e4de",
      fontFamily: "'DM Sans', sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* ── GRAVITY STARS BACKGROUND ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        color: "rgba(197,160,89,0.6)",  /* stars inherit this color */
        pointerEvents: "none",
      }}>
        <GravityStarsBackground
          starsCount={90}
          starsSize={1.5}
          starsOpacity={0.55}
          glowIntensity={12}
          glowAnimation="ease"
          movementSpeed={0.25}
          mouseInfluence={130}
          mouseGravity="attract"
          gravityStrength={80}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            color: "rgba(197,160,89,0.7)",
          }}
        />
      </div>

      {/* All page content sits above the stars */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* ── KEYFRAMES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }
        .chat-sidebar-link {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 16px; border-radius: 10px; cursor: pointer;
          transition: all 0.2s; border: none; background: none;
          width: 100%; text-align: left; color: rgba(201,195,185,0.65);
          font-size: 13.5px; font-weight: 500; font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.01em;
        }
        .chat-sidebar-link:hover { background: rgba(197,160,89,0.08); color: #C5A059; }
        .chat-sidebar-link.active { background: rgba(197,160,89,0.1); color: #C5A059; border-left: 2px solid #C5A059; border-radius: 0 10px 10px 0; }
        .chat-send-btn { transition: all 0.2s ease; }
        .chat-send-btn:hover:not(:disabled) { transform: scale(1.05); }
        .chat-send-btn:active:not(:disabled) { transform: scale(0.95); }
        .suggestion-chip:hover { background: rgba(197,160,89,0.12) !important; border-color: rgba(197,160,89,0.4) !important; color: #C5A059 !important; }
        .icon-btn:hover { color: #C5A059 !important; background: rgba(197,160,89,0.1) !important; }
        .model-select {
          background: rgba(255,255,255,0.03);
          color: rgba(232,228,222,0.9);
          border: 1px solid rgba(197,160,89,0.22);
          border-radius: 9px;
          height: 32px;
          padding: 0 30px 0 10px;
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.02em;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
          background-image: linear-gradient(45deg, transparent 50%, rgba(197,160,89,0.9) 50%), linear-gradient(135deg, rgba(197,160,89,0.9) 50%, transparent 50%);
          background-position: calc(100% - 13px) 13px, calc(100% - 8px) 13px;
          background-size: 5px 5px, 5px 5px;
          background-repeat: no-repeat;
        }
        .model-select:hover {
          border-color: rgba(197,160,89,0.45);
          background-color: rgba(197,160,89,0.08);
        }
        .model-select:focus {
          border-color: rgba(197,160,89,0.65);
          box-shadow: 0 0 0 2px rgba(197,160,89,0.16);
        }
        .model-select option {
          background: #151515;
          color: #e8e4de;
        }
        .mobile-only { display: none; }
        .desktop-only { display: flex; }
        .mobile-model-menu {
          position: absolute;
          bottom: 42px;
          left: 0;
          min-width: 136px;
          background: #141414;
          border: 1px solid rgba(197,160,89,0.28);
          border-radius: 10px;
          box-shadow: 0 10px 28px rgba(0,0,0,0.45);
          padding: 6px;
          z-index: 60;
        }
        .mobile-model-option {
          width: 100%;
          border: none;
          background: none;
          color: rgba(232,228,222,0.9);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          text-align: left;
          padding: 7px 8px;
          border-radius: 7px;
          cursor: pointer;
        }
        .mobile-model-option.active {
          color: #C5A059;
          background: rgba(197,160,89,0.12);
        }
        .mobile-model-option:hover {
          color: #C5A059;
          background: rgba(197,160,89,0.1);
        }
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 40; }
        @media (max-width: 768px) {
          .sidebar-overlay.open { display: block; }
          .suggestion-grid { width: 100%; max-width: 100% !important; }
          .suggestion-chip {
            width: 100%;
            text-align: left !important;
            font-size: 12px !important;
            line-height: 1.4;
            padding: 10px 14px !important;
            border-radius: 12px !important;
            white-space: normal;
          }
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
          .input-actions-mobile {
            display: flex;
            align-items: center;
            gap: 2px;
          }
          .model-icon-wrap {
            position: relative;
          }

          .assistant-markdown {
            font-size: 13.5px;
            line-height: 1.65;
            overflow-wrap: anywhere;
            word-break: break-word;
          }
          .assistant-markdown-h {
            margin: 0 0 10px;
            line-height: 1.2;
            color: #f4f1ea;
            font-family: 'Cormorant Garamond', serif;
          }
          .assistant-markdown-h1 { font-size: 1.45rem; }
          .assistant-markdown-h2 { font-size: 1.25rem; }
          .assistant-markdown-h3 { font-size: 1.1rem; }
          .assistant-markdown-h4,
          .assistant-markdown-h5,
          .assistant-markdown-h6 { font-size: 1rem; }
          .assistant-markdown-p { margin: 0 0 12px; }
          .assistant-markdown-list {
            margin: 0 0 12px 1.2rem;
            padding-left: 1rem;
          }
          .assistant-markdown-list li {
            margin: 0 0 8px;
            padding-left: 0.15rem;
          }
          .assistant-markdown-quote {
            margin: 0 0 12px;
            padding: 10px 12px;
            border-left: 3px solid rgba(197,160,89,0.5);
            background: rgba(197,160,89,0.06);
            border-radius: 10px;
            color: rgba(232,228,222,0.92);
          }
          .assistant-markdown-quote p {
            margin: 0 0 8px;
          }
          .assistant-markdown-divider {
            border: 0;
            border-top: 1px solid rgba(255,255,255,0.08);
            margin: 14px 0;
          }
          .assistant-markdown-table-wrap {
            width: 100%;
            overflow-x: auto;
            margin: 0 0 14px;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            background: rgba(0,0,0,0.18);
          }
          .assistant-markdown-table {
            width: 100%;
            min-width: 540px;
            border-collapse: collapse;
            font-size: 13px;
          }
          .assistant-markdown-table th,
          .assistant-markdown-table td {
            text-align: left;
            vertical-align: top;
            padding: 10px 12px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            border-right: 1px solid rgba(255,255,255,0.06);
            color: rgba(232,228,222,0.9);
          }
          .assistant-markdown-table th {
            background: rgba(197,160,89,0.08);
            color: #f5eee1;
            font-weight: 700;
          }
          .assistant-markdown-table tr:last-child td {
            border-bottom: none;
          }
        }
      `}</style>

      {/* ─── SIDEBAR ──────────────────────────────────────────────────── */}
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside style={{
        width: 268,
        flexShrink: 0,
        background: "#0a0a0a",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "fixed",
        left: sidebarOpen ? 0 : "auto",
        zIndex: 50,
        transition: "transform 0.3s ease",
        transform: sidebarOpen ? "translateX(0)" : undefined,
      }}
        className="chat-sidebar"
      >
        {/* Logo */}
        <div style={{ padding: "28px 22px 20px" }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, background: "linear-gradient(135deg, #C5A059, #8B6F3A)",
              borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", padding: 4,
            }}>
              <img src={logoImg} alt="NyayaBot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#C5A059", letterSpacing: "-0.02em", fontFamily: "'Cormorant Garamond', serif" }}>
                NyayaBot
              </div>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(201,195,185,0.5)", textTransform: "uppercase" }}>
                Digital Magistrate
              </div>
            </div>
          </Link>
        </div>

        {/* New Inquiry */}
        <div style={{ padding: "0 14px 16px" }}>
          <button
            onClick={() => {
              setMessages([]);
              setRequestError(null);
              resetStreamState();
              clearUploadState();
            }}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "11px 16px", borderRadius: 10, cursor: "pointer",
              background: "rgba(197,160,89,0.12)", border: "1px solid rgba(197,160,89,0.2)",
              color: "#C5A059", fontSize: 13.5, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.01em", transition: "all 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(197,160,89,0.2)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(197,160,89,0.12)")}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            New Inquiry
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "0 8px", flex: 1, overflowY: "auto" }}>
          <div style={{ marginBottom: 6 }}>
            {[
              { icon: "history", label: "Precedents" },
              { icon: "balance", label: "Jurisdiction" },
              { icon: "folder_special", label: "Archives" },
            ].map(({ icon, label }) => (
              <button key={label} className="chat-sidebar-link">
                <span className="material-symbols-outlined" style={{ fontSize: 19 }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Recent */}
          <div style={{ marginTop: 24, paddingLeft: 8 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,195,185,0.3)", marginBottom: 10, fontWeight: 700 }}>
              Recent
            </p>
            {["Article 21 Interpretation", "Directive Principles", "Writ Jurisdiction"].map(item => (
              <div key={item} style={{
                padding: "8px 10px", fontSize: 12.5, color: "rgba(201,195,185,0.55)",
                cursor: "pointer", borderRadius: 7, transition: "all 0.2s",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                fontFamily: "'DM Sans', sans-serif",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(197,160,89,0.07)"; e.currentTarget.style.color = "#C5A059"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "rgba(201,195,185,0.55)"; }}
              >
                {item}
              </div>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 8px 20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {[{ icon: "settings", label: "Settings" }, { icon: "help_center", label: "Support" }].map(({ icon, label }) => (
            <button key={label} className="chat-sidebar-link">
              <span className="material-symbols-outlined" style={{ fontSize: 19 }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* ─── MAIN ─────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: 268, minWidth: 0 }}
        // On mobile, no margin since sidebar is overlay
        className="chat-main"
      >
        <style>{`
          @media (max-width: 768px) {
            .chat-sidebar { display: none !important; }
            .chat-sidebar.open { display: flex !important; }
            .chat-main { margin-left: 0 !important; }
          }
        `}</style>

        {/* ── Top Bar ── */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 24px",
          borderBottom: isEmpty ? "none" : "1px solid rgba(255,255,255,0.05)",
          background: "rgba(13,13,13,0.8)",
          backdropFilter: "blur(12px)",
          position: "sticky", top: 0, zIndex: 30,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "rgba(201,195,185,0.6)", padding: 4 }}
              className="mobile-menu-btn"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <style>{`.mobile-menu-btn { display: none; } @media (max-width:768px) { .mobile-menu-btn { display:flex !important; } }`}</style>

            {!isEmpty && (
              <span style={{ fontSize: 13.5, color: "rgba(201,195,185,0.5)", fontWeight: 500 }}>
                Case File: 2024/CONST/882
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="icon-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,195,185,0.5)", borderRadius: 8, padding: "6px 8px", transition: "all 0.2s" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 21 }}>gavel</span>
            </button>
            <button className="icon-btn" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,195,185,0.5)", borderRadius: 8, padding: "6px 8px", transition: "all 0.2s" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 21 }}>account_balance</span>
            </button>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              // background: "rgba(197,160,89,0.15)", border: "1px solid rgba(197,160,89,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#C5A059" }}>person</span> */}
            </div>
          </div>
        </header>

        {/* ── Messages / Empty State ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: isEmpty ? 0 : "32px 0 160px", position: "relative" }}>
          {isEmpty ? (
            /* ── EMPTY STATE (ChatGPT-style centered) ── */
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              height: "100%", padding: "0 24px", textAlign: "center",
              paddingBottom: "120px",
            }}>


              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                fontSize: "clamp(24px, 3.5vw, 38px)", color: "#e8e4de",
                marginBottom: 12, lineHeight: 1.2,
              }}>
                What's on your legal mind?
              </h2>
              <p style={{
                fontSize: 15, color: "rgba(201,195,185,0.55)", lineHeight: 1.7,
                maxWidth: 400, marginBottom: 42, fontFamily: "'DM Sans', sans-serif",
              }}>
                Ask NyayaBot about Indian law, constitutional rights, statutes, or legal procedures.
              </p>

              {/* Suggestion chips */}
              <div className="suggestion-grid" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 600 }}>
                {suggestions.map(s => (
                  <button
                    key={s}
                    className="suggestion-chip"
                    onClick={() => sendMessage(s)}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 999,
                      padding: "9px 18px",
                      fontSize: 13,
                      color: "rgba(201,195,185,0.75)",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── MESSAGES ── */
            <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: 28 }}>
              {messages.map(msg =>
                msg.role === "user"
                  ? <UserBubble key={msg.id} message={msg} />
                  : <BotBubble key={msg.id} message={msg} />
              )}

              {/* Loading indicator */}
              {isLoading && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, animation: "fadeSlideUp 0.3s ease" }}>
                  <div style={{
                    width: 26, height: 26, background: "rgba(197,160,89,0.15)",
                    border: "1px solid rgba(197,160,89,0.3)", borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 3,
                  }}>
                    <img src={logoImg} alt="NyayaBot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "12px 18px", background: "#111", borderRadius: "4px 18px 18px 18px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: 6, height: 6, borderRadius: "50%", background: "#C5A059",
                        animation: `typing 1.2s ${i * 0.2}s ease-in-out infinite`
                      }} />
                    ))}
                  </div>
                </div>
              )}
              {isLoading && (rlmStatus || rlmTurns.length > 0 || rlmOutputs.length > 0) ? (
                <div style={{ width: "100%", marginTop: -4, marginBottom: 4 }}>
                  {rlmStatus ? (
                    <div style={{
                      marginBottom: 10,
                      padding: "10px 14px",
                      borderRadius: 12,
                      border: "1px solid rgba(197,160,89,0.2)",
                      background: "rgba(197,160,89,0.06)",
                      color: "rgba(232,228,222,0.92)",
                      fontSize: 12.5,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      {rlmStatus}
                    </div>
                  ) : null}
                  {(rlmTurns.length > 0 || rlmOutputs.length > 0) && (
                    <details
                      open={rlmTraceOpen}
                      onToggle={(e) => setRlmTraceOpen((e.currentTarget as HTMLDetailsElement).open)}
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        background: "rgba(17,17,17,0.7)",
                        padding: "10px 12px",
                      }}
                    >
                      <summary style={{
                        cursor: "pointer",
                        color: "#C5A059",
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                        listStyle: "none",
                      }}>
                        Execution Trace
                      </summary>
                      <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                        {rlmTurns.length > 0 ? (
                          <div style={{ color: "rgba(232,228,222,0.75)", fontSize: 12, lineHeight: 1.55, whiteSpace: "pre-wrap", fontFamily: "'DM Sans', sans-serif" }}>
                            {rlmTurns.map((turn, index) => `${index + 1}. ${turn}`).join("\n")}
                          </div>
                        ) : null}
                        {rlmOutputs.length > 0 ? (
                          <pre style={{
                            margin: 0,
                            color: "rgba(232,228,222,0.8)",
                            background: "rgba(0,0,0,0.24)",
                            borderRadius: 10,
                            padding: 10,
                            whiteSpace: "pre-wrap",
                            fontSize: 11.5,
                            lineHeight: 1.6,
                            fontFamily: "'DM Sans', sans-serif",
                          }}>
                            {rlmOutputs.join("\n\n")}
                          </pre>
                        ) : null}
                      </div>
                    </details>
                  )}
                </div>
              ) : null}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

           

        {/* ── INPUT BAR ── */}
        <div style={{
          position: "sticky", bottom: 0,
          padding: isEmpty ? "16px 20px 28px" : "12px 20px 24px",
          background: "linear-gradient(to top, #0D0D0D 60%, transparent)",
        }}>
           {selectedFiles.length > 0 ? (
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  padding: "6px 4px 6px 10px",
                  maxWidth: 220,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}>
                  {selectedFiles.map((file, index) => (
                    <button
                      key={`${file.name}-${file.size}-${file.lastModified}`}
                      type="button"
                      onClick={() => removeSelectedFile(index)}
                      title="Remove attachment"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        border: "1px solid rgba(197,160,89,0.18)",
                        background: "rgba(197,160,89,0.08)",
                        borderRadius: 999,
                        color: "rgba(232,228,222,0.84)",
                        padding: "5px 10px",
                        fontSize: 11,
                        cursor: "pointer",
                        maxWidth: 210,
                      }}
                    >
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
                    </button>
                  ))}
                </div>
              ) : null}
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 0,
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "6px 8px 6px 8px",
              transition: "border-color 0.25s",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            }}
              onFocusCapture={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(197,160,89,0.45)")}
              onBlurCapture={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)")}
            >
                {/* File buttons */}
                <input ref={fileInputRef} type="file" accept=".pdf,.md,.txt,.doc,.docx" multiple style={{ display: "none" }} onChange={e => handleFileSelection(e.target.files)} />
                <input ref={mobileAttachInputRef} type="file" accept=".pdf,.md,.txt,.doc,.docx" multiple style={{ display: "none" }} onChange={e => handleFileSelection(e.target.files)} />

              <div className="desktop-only" style={{ gap: 2, alignItems: "center" }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="icon-btn"
                  title="Attach document"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,195,185,0.4)", borderRadius: 8, padding: "6px 8px", transition: "all 0.2s" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>attach_file</span>
                </button>
              </div>

              <div className="mobile-only input-actions-mobile">
                <button
                  onClick={() => mobileAttachInputRef.current?.click()}
                  className="icon-btn"
                  title="Attach document"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,195,185,0.4)", borderRadius: 8, padding: "6px 8px", transition: "all 0.2s" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>attach_file</span>
                </button>

                <div className="model-icon-wrap">
                  <button
                    onClick={() => setMobileModelMenuOpen(v => !v)}
                    className="icon-btn"
                    title="Change model"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,195,185,0.4)", borderRadius: 8, padding: "6px 8px", transition: "all 0.2s" }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>tune</span>
                  </button>

                  {mobileModelMenuOpen && (
                    <div className="mobile-model-menu">
                      {[
                        { value: "auto", label: "Auto (/chat)" },
                        { value: "deepseek", label: "deepseek" },
                        { value: "gemini", label: "gemini" },
                      ].map((item) => (
                        <button
                          key={item.value}
                          className={`mobile-model-option ${selectedModel === item.value ? "active" : ""}`}
                          onClick={() => {
                            setSelectedModel(item.value as ModelChoice);
                            setMobileModelMenuOpen(false);
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              
              <select
                className="model-select desktop-only"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as ModelChoice)}
                title="Select model"
                style={{
                  marginLeft: 8,
                  marginRight: 6,
                  flexShrink: 0,
                }}
                aria-label="Select model"
              >
                <option value="auto">Auto (/chat)</option>
                <option value="deepseek">deepseek</option>
                <option value="gemini">gemini</option>
              </select>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Inquire about statutes, precedents, or legal theories..."
                rows={1}
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "#e8e4de",
                  fontFamily: "'DM Sans', sans-serif",
                  padding: "10px 12px",
                  maxHeight: 160,
                  minHeight: 38,
                  overflowY: "auto",
                  caretColor: "#C5A059",
                  alignSelf: "center",
                }}
              />

              {/* Send button */}
              <button
                className="chat-send-btn"
                disabled={!inputText.trim() || isLoading}
                onClick={() => sendMessage()}
                style={{
                  width: 38, height: 38,
                  borderRadius: 10,
                  border: "none",
                  cursor: inputText.trim() && !isLoading ? "pointer" : "not-allowed",
                  background: inputText.trim() && !isLoading
                    ? "linear-gradient(135deg, #C5A059, #8B6F3A)"
                    : "rgba(255,255,255,0.07)",
                  color: inputText.trim() && !isLoading ? "#1a0e00" : "rgba(201,195,185,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, alignSelf: "center",
                  boxShadow: inputText.trim() && !isLoading ? "0 4px 20px rgba(197,160,89,0.3)" : "none",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 19, fontVariationSettings: "'FILL' 1" }}>
                  {isLoading ? "hourglass_empty" : "arrow_upward"}
                </span>
              </button>
            </div>

            {/* Footer hint */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10, gap: 24 }}>
              <span style={{ fontSize: 10.5, color: "rgba(201,195,185,0.28)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
                Enter to send  ·  Shift+Enter for new line
              </span>
            </div>
            {requestError && (
              <div style={{
                marginTop: 8,
                textAlign: "center",
                fontSize: 11.5,
                color: "#f7b5b5",
                letterSpacing: "0.02em",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {requestError}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
