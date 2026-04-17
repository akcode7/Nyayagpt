import { Hero } from "../components/Hero";
import { TrustStrip } from "../components/TrustStrip";
import { Testimonials } from "../components/Testimonials";
import { CTABlock } from "../components/CTABlock";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Testimonials />
      <CTABlock />
    </>
  );
}
