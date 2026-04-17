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

// ScrollToTop component ensures navigating to a new page scrolls up
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
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
              background: "#FFFFFF",
              color: "#0D0D0D",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              minHeight: "100vh",
              cursor: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomCursor />
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </ClickSpark>
      </LanguageProvider>
    </BrowserRouter>
  );
}