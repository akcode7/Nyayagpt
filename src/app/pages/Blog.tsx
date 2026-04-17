import { CTABlock } from "../components/CTABlock";

export default function Blog() {
  return (
    <div style={{ paddingTop: 120 }}>
      {/* Spacer for navbar */}
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16 }}>Blog</h1>
        <p style={{ fontSize: 18, color: "#666" }}>Currently under construction. Check back later!</p>
      </div>
      <CTABlock />
    </div>
  );
}
