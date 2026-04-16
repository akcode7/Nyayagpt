import "./nyayabot.css";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { Features } from "./components/Features";
import { Walkthrough } from "./components/Walkthrough";
import { Testimonials } from "./components/Testimonials";
import { TrustBadges } from "./components/TrustBadges";
import { CTABlock } from "./components/CTABlock";
import { Footer } from "./components/Footer";
import ClickSpark from "./components/ClickSpark";
import { BackToTop } from "./components/BackToTop";

export default function App() {
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
          background: "#FFFFFF",
          color: "#0D0D0D",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          minHeight: "100vh",
          cursor: "none",
        }}
      >
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <Features />
          <Walkthrough />
          <Testimonials />
          <TrustBadges />
          <CTABlock />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ClickSpark>
  );
}