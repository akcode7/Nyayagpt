import React, { useState } from "react";
import { Link } from "react-router";

export const Chat = () => {
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content: "Constitutional Intelligence Portal",
      subcontent: "Synthesizing precedents from the Supreme Court of India. You are currently inquiring about fundamental rights and state directives.",
      isWelcome: true,
    },
    {
      type: "user",
      content: "Can you explain the symbiotic relationship between Article 21 and the Directive Principles of State Policy, specifically regarding the right to a clean environment?",
      time: "14:02 PM",
    },
    {
      type: "assistant",
      content: "The relationship you're inquiring about is one of the most dynamic evolutions in Indian Jurisprudence. While Directive Principles (Part IV) were originally non-justiciable, the Supreme Court has read them into the Fundamental Rights (Part III) via Article 21.",
      citations: [
        {
          title: "M.C. Mehta v. Union of India",
          desc: "The bedrock of environmental litigation, establishing that the right to live includes the right to enjoy a pollution-free environment."
        },
        {
          title: "Article 48A & 51A(g)",
          desc: "These constitutional mandates provide the textual anchor for the State and Citizens to protect the natural environment."
        }
      ],
      closing: "Essentially, the Court has transformed the State's \"duty\" under Directive Principles into the citizen's \"right\" under Article 21. This creates a \"Right to Environment\" that is fundamental and enforceable."
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    setMessages([
      ...messages,
      { type: "user", content: inputText.trim(), time: `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}` }
    ]);
    setInputText("");
    // Here we'd call an AI backend!
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e0e0e] text-[#e5e2e1] dm-sans dark" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col h-full w-72 left-0 top-0 fixed bg-[#0e0e0e] border-r border-[#4e4639]/30 z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <Link to="/">
              <div className="w-10 h-10 bg-gradient-to-br from-[#e9c176] to-[#c5a059] flex items-center justify-center rounded-sm transition-transform hover:scale-105 cursor-pointer">
                <span className="material-symbols-outlined text-[#412d00] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
              </div>
            </Link>
            <div>
              <h1 className="nyaya-h3 text-[#e9c176] tracking-tighter" style={{ fontSize: "24px" }}>NyayaBot</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#d1c5b4] opacity-70">Digital Magistrate</p>
            </div>
          </div>
          
          <nav className="space-y-4">
            <button className="w-full flex items-center gap-4 py-3 px-4 bg-[#131313] text-[#e9c176] border-l-2 border-[#C5A059] transition-all rounded-r-md">
              <span className="material-symbols-outlined">add_notes</span>
              <span className="text-sm font-medium tracking-wide">New Inquiry</span>
            </button>
            <button className="w-full flex items-center gap-4 py-3 text-[#d1c5b4] opacity-70 pl-4 hover:bg-[#131313] hover:text-[#e9c176] transition-all rounded-md">
              <span className="material-symbols-outlined">history</span>
              <span className="text-sm font-medium tracking-wide">Precedents</span>
            </button>
            <button className="w-full flex items-center gap-4 py-3 text-[#d1c5b4] opacity-70 pl-4 hover:bg-[#131313] hover:text-[#e9c176] transition-all rounded-md">
              <span className="material-symbols-outlined">balance</span>
              <span className="text-sm font-medium tracking-wide">Jurisdiction</span>
            </button>
            <button className="w-full flex items-center gap-4 py-3 text-[#d1c5b4] opacity-70 pl-4 hover:bg-[#131313] hover:text-[#e9c176] transition-all rounded-md">
              <span className="material-symbols-outlined">folder_special</span>
              <span className="text-sm font-medium tracking-wide">Archives</span>
            </button>
          </nav>
          
          <div className="mt-12">
            <p className="text-[10px] uppercase tracking-widest text-[#9a8f80] mb-5 opacity-70">Recent Researches</p>
            <ul className="space-y-4">
              <li className="group cursor-pointer">
                <p className="text-xs text-[#d1c5b4] group-hover:text-[#e9c176] transition-colors truncate">Article 21 Interpretation</p>
              </li>
              <li className="group cursor-pointer">
                <p className="text-xs text-[#d1c5b4] group-hover:text-[#e9c176] transition-colors truncate">Directive Principles</p>
              </li>
              <li className="group cursor-pointer">
                <p className="text-xs text-[#d1c5b4] group-hover:text-[#e9c176] transition-colors truncate">Writ Jurisdiction Analysis</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-auto p-8 space-y-2">
          <button className="w-full flex items-center gap-4 py-2 text-[#d1c5b4] opacity-70 pl-4 hover:text-[#e9c176] transition-all rounded-md">
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-sm font-medium tracking-wide">Settings</span>
          </button>
          <button className="w-full flex items-center gap-4 py-2 text-[#d1c5b4] opacity-70 pl-4 hover:text-[#e9c176] transition-all rounded-md">
            <span className="material-symbols-outlined text-xl">help_center</span>
            <span className="text-sm font-medium tracking-wide">Support</span>
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col md:ml-72 bg-[#131313] relative h-full">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-6 md:px-8 py-5 bg-[#131313]/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#4e4639]/20">
          <div className="md:hidden flex items-center gap-2">
             <Link to="/">
              <div className="w-8 h-8 bg-gradient-to-br from-[#e9c176] to-[#c5a059] flex items-center justify-center rounded-sm">
                <span className="material-symbols-outlined text-[#412d00] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
              </div>
            </Link>
            <h1 className="nyaya-h3 italic text-[#e9c176] text-xl tracking-tighter">NyayaBot</h1>
          </div>
          <div className="hidden md:block">
            <h2 className="nyaya-h3 font-bold text-lg tracking-tight text-[#e5e2e1]" style={{ fontSize: "1.2rem" }}>Case File: 2024/CONST/882</h2>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-[#d1c5b4] hover:text-[#e9c176] transition-colors duration-300">
              <span className="material-symbols-outlined">gavel</span>
            </button>
            <button className="text-[#d1c5b4] hover:text-[#e9c176] transition-colors duration-300">
              <span className="material-symbols-outlined">account_balance</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#4e4639]/50 bg-[#2a2a2a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#e9c176] text-sm">person</span>
            </div>
          </div>
        </header>

        {/* Chat Conversation Area */}
        <section className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-12 space-y-8 md:space-y-12 max-w-4xl mx-auto w-full scroll-smooth">
          {messages.map((msg, idx) => {
            if (msg.isWelcome) {
              return (
                <div key={idx} className="flex flex-col items-center mb-10 md:mb-16 text-center animate-fade-in-up">
                  <span className="material-symbols-outlined text-4xl text-[#e9c176] mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                  <h3 className="nyaya-h3 text-3xl mb-3 text-[#e5e2e1]">{msg.content}</h3>
                  <p className="text-[#d1c5b4] max-w-md text-sm leading-relaxed">{msg.subcontent}</p>
                </div>
              );
            }

            if (msg.type === "user") {
              return (
                <div key={idx} className="flex flex-col items-end gap-2 animate-fade-in-up">
                  <div className="bg-[#2a2a2a] px-5 py-4 rounded-xl rounded-tr-sm max-w-[90%] md:max-w-[75%] border-b border-[#4e4639]/30 shadow-md">
                    <p className="text-[#e5e2e1] leading-relaxed text-sm md:text-[15px]">{msg.content}</p>
                  </div>
                  {msg.time && <span className="text-[10px] text-[#d1c5b4]/60 font-medium px-1 uppercase tracking-tighter">{msg.time}</span>}
                </div>
              );
            }

            return (
              <div key={idx} className="flex flex-col items-start gap-3 animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#e9c176]/20 flex items-center justify-center rounded-sm">
                    <span className="material-symbols-outlined text-[#e9c176] text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
                  </div>
                  <span className="text-[10px] text-[#e9c176] font-bold uppercase tracking-widest">NyayaBot Response</span>
                </div>
                <div className="bg-[#0e0e0e] px-6 py-6 md:px-8 md:py-8 rounded-xl rounded-tl-sm max-w-[95%] space-y-4 border border-[#4e4639]/20 shadow-lg">
                  <p className="text-[#e5e2e1] leading-relaxed text-sm md:text-[15px]">{msg.content}</p>
                  
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-6">
                      {msg.citations.map((cite, cIdx) => (
                        <div key={cIdx} className="bg-[#1c1b1b] p-4 rounded-md border-l-2 border-[#e9c176]/60 hover:bg-[#2a2a2a] transition-colors cursor-pointer group">
                          <h4 className="nyaya-h3 italic text-[#e9c176] text-sm mb-2 group-hover:text-[#f3d699] transition-colors" style={{ fontSize: "1rem" }}>{cite.title}</h4>
                          <p className="text-xs text-[#d1c5b4] leading-relaxed opacity-90">{cite.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {msg.closing && (
                    <p className="text-[#e5e2e1] leading-relaxed text-sm md:text-[15px]">{msg.closing}</p>
                  )}
                </div>
                <div className="flex gap-4 px-2 mt-1">
                  <button className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-[#d1c5b4] hover:text-[#e9c176] transition-colors">
                    <span className="material-symbols-outlined text-[13px]">content_copy</span> Copy Citation
                  </button>
                  <button className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-[#d1c5b4] hover:text-[#e9c176] transition-colors">
                    <span className="material-symbols-outlined text-[13px]">share</span> Share Brief
                  </button>
                </div>
              </div>
            );
          })}
          {/* Spacer for bottom padding against fixed input */}
          <div className="h-40 md:h-32 w-full"></div>
        </section>

        {/* Fixed Bottom Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#131313] via-[#131313] to-transparent pt-6 pb-4 md:pb-8 px-4 md:px-8 z-50">
          <div className="max-w-4xl mx-auto bg-[#0e0e0e]/80 backdrop-blur-xl border border-[#4e4639]/50 rounded-2xl p-2 md:p-3 shadow-2xl focus-within:border-[#e9c176]/50 transition-colors duration-300">
            <div className="flex items-end gap-2 md:gap-4">
              <div className="flex gap-1 md:gap-2 pl-2 pb-2">
                <button className="text-[#9a8f80] hover:text-[#e9c176] p-2 hover:bg-[#e9c176]/10 rounded-full transition-all" title="Upload Document">
                  <span className="material-symbols-outlined text-lg md:text-xl">attach_file</span>
                </button>
                <button className="text-[#9a8f80] hover:text-[#e9c176] p-2 hover:bg-[#e9c176]/10 rounded-full transition-all" title="Upload Photo">
                  <span className="material-symbols-outlined text-lg md:text-xl">photo_camera</span>
                </button>
              </div>
              
              <textarea 
                className="flex-1 bg-transparent border-none focus:ring-0 text-[#e5e2e1] placeholder:text-[#9a8f80]/60 resize-none py-3 text-sm md:text-base max-h-32 min-h-[44px]" 
                placeholder="Inquire about statutes, precedents, or legal theories..." 
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ outline: 'none' }}
              />
              
              <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className={`mb-1 mr-1 ${inputText.trim() ? 'bg-gradient-to-tr from-[#e9c176] to-[#c5a059] text-[#412d00] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95' : 'bg-[#2a2a2a] text-[#9a8f80] cursor-not-allowed'} font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all`}
                title="Send Message"
              >
                 <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto flex justify-between items-center mt-3 px-2">
            <div className="flex gap-4">
              <span className="text-[9px] uppercase tracking-widest text-[#9a8f80]/50 hidden sm:inline-block">Model: Juris-v4 High Precision</span>
              <span className="text-[9px] uppercase tracking-widest text-[#9a8f80]/50 hidden sm:inline-block">Encryption: AES-256 Legal Grade</span>
            </div>
            <p className="text-[9px] text-[#9a8f80]/50 text-center w-full sm:w-auto">NyayaBot can make mistakes. Check important information.</p>
          </div>
        </div>
      </main>

      {/* Mobile Navigation Overlay */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0e0e0e] border-t border-[#4e4639]/30 flex justify-around items-center z-[60] pb-safe">
        <button className="flex flex-col items-center gap-1.5 p-2 w-16">
          <span className="material-symbols-outlined text-[#e9c176] text-xl">add_notes</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2 w-16">
          <span className="material-symbols-outlined text-[#9a8f80] hover:text-[#e9c176] transition-colors text-xl">history</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2 w-16">
          <span className="material-symbols-outlined text-[#9a8f80] hover:text-[#e9c176] transition-colors text-xl">balance</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 p-2 w-16">
          <span className="material-symbols-outlined text-[#9a8f80] hover:text-[#e9c176] transition-colors text-xl">settings</span>
        </button>
      </div>

    </div>
  );
};
