import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import "./nyayabot.css";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import ClickSpark from "./components/ClickSpark";
import { BackToTop } from "./components/BackToTop";
import { LanguageProvider } from "./context/LanguageContext";

// Import Pages
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import FeaturesPage from "./pages/FeaturesPage";
import About from "./pages/About";
import Blog from "./pages/Blog";
import { Chat } from "./pages/Chat";

function ProtectedChat() {
  return (
    <>
      <Show when="signed-out">
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "32px 20px",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 4vw, 34px)", color: "#e8e4de", fontFamily: "'Cormorant Garamond', serif" }}>
            Sign In To Access NyayaBot Chat
          </h2>
          <p style={{ margin: 0, color: "rgba(232,228,222,0.72)", maxWidth: 560, fontFamily: "'DM Sans', sans-serif" }}>
            Choose an option to continue.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <SignInButton mode="modal">
              <button
                style={{
                  border: "1px solid rgba(197,160,89,0.35)",
                  background: "rgba(197,160,89,0.12)",
                  color: "#C5A059",
                  padding: "10px 16px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#e8e4de",
                  padding: "10px 16px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </Show>

      <Show when="signed-in">
        <div style={{ position: "relative" }}>
          <div style={{ position: "fixed", right: 16, top: 16, zIndex: 80 }}>
            <UserButton />
          </div>
          <Chat />
        </div>
      </Show>
    </>
  );
}

// ScrollToTop component ensures navigating to a new page scrolls up
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLayout() {
  const { pathname } = useLocation();
  const isChat = pathname === '/ask';

  return (
    <ClickSpark
      sparkColor="#0D0D0D"
      sparkSize={12}
      sparkRadius={22}
      sparkCount={10}
      duration={500}
      easing="ease-out"
      extraScale={1.2}
    >
      <div
        style={{
          background: isChat ? "#0e0e0e" : "#FFFFFF",
          color: isChat ? "#e5e2e1" : "#0D0D0D",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          minHeight: "100vh",
          cursor: isChat ? "auto" : "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!isChat && <CustomCursor />}
        {!isChat && <Navbar />}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/ask" element={<ProtectedChat />} />
          </Routes>
        </main>
        {!isChat && <Footer />}
        {!isChat && <BackToTop />}
      </div>
    </ClickSpark>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
        <PageLayout />
      </LanguageProvider>
    </BrowserRouter>
  );
}