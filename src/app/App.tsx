import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
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
            <Route path="/ask" element={<Chat />} />
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