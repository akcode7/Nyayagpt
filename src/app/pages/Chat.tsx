import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import logoImg from "../../imports/new_logo.png";
import { GravityStarsBackground } from "../components/GravityStars";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

// ─── Sample suggestions shown on empty state ─────────────────────────────────
const suggestions = [
  "What is Article 21 of the Indian Constitution?",
  "Explain the concept of Fundamental Rights vs Directive Principles",
  "Help me understand the Right to Information Act",
  "What are the grounds for filing a PIL in India?",
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function getTime() {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m < 10 ? "0" + m : m} ${ampm}`;
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
        padding: "16px 22px",
        maxWidth: "80%",
        fontSize: 15,
        lineHeight: 1.75,
        color: "#d8d4ce",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "pre-wrap",
      }}>
        {message.content}
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
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const isEmpty = messages.length === 0;

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const sendMessage = (text?: string) => {
    const content = (text ?? inputText).trim();
    if (!content || isLoading) return;

    const userMsg: Message = { id: Date.now(), role: "user", content, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: `Thank you for your inquiry regarding "${content.slice(0, 60)}${content.length > 60 ? '...' : ''}". \n\nAs per Indian constitutional jurisprudence, this is a nuanced area of law. The Supreme Court of India has consistently held that constitutional provisions must be interpreted in light of the founding principles and evolving societal needs.\n\nFor a comprehensive legal opinion on your specific situation, I recommend consulting with a qualified advocate. I can provide general legal information and direct you to relevant statutes and precedents.`,
        time: getTime(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }, 1800);
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
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 40; }
        @media (max-width: 768px) {
          .sidebar-overlay.open { display: block; }
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
            onClick={() => setMessages([])}
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
              background: "rgba(197,160,89,0.15)", border: "1px solid rgba(197,160,89,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#C5A059" }}>person</span>
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 600 }}>
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
              {/* File/Photo buttons */}
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: "none" }} />
              <input ref={photoInputRef} type="file" accept="image/*" style={{ display: "none" }} />

              <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="icon-btn"
                  title="Attach document"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,195,185,0.4)", borderRadius: 8, padding: "6px 8px", transition: "all 0.2s" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>attach_file</span>
                </button>
                <button
                  onClick={() => photoInputRef.current?.click()}
                  className="icon-btn"
                  title="Upload image"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,195,185,0.4)", borderRadius: 8, padding: "6px 8px", transition: "all 0.2s" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>photo_camera</span>
                </button>
              </div>

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
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
