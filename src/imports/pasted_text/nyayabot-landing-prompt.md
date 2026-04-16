# 🏛️ NyayaBot — Figma Landing Page Design Prompt

---

## BRAND CONCEPT

NyayaBot is an AI-powered constitutional assistant for every Indian citizen. Like ChatGPT, but trained exclusively on the Indian Constitution, landmark judgments, and fundamental rights. The design must feel authoritative yet accessible — not a dry legal portal, but a modern civic tech product that empowers the common man.

Tone: Editorial luxury meets civic trust. Think Supreme Court gravitas delivered through the speed of a modern SaaS product.
Reference aesthetic: Legora.com — bold hero, editorial typography, dark premium feel.
Indian identity: Subtle, not loud. Ashoka Chakra geometry, saffron-to-navy gradient, not garish patriotic kitsch.

---

## COLOR SYSTEM

--color-bg-base:        #0A0D14   /* Deep navy-black — primary canvas */
--color-bg-surface:     #111520   /* Card & panel surfaces */
--color-bg-elevated:    #1A2035   /* Elevated components, modals */

--color-saffron:        #FF6B1A   /* Primary accent — Indian saffron */
--color-gold:           #D4A853   /* Secondary accent — constitutional gold */
--color-chakra-blue:    #1A4F8A   /* Ashoka Chakra blue */
--color-chakra-light:   #3B82C4   /* Hover / link states */

--color-text-primary:   #F0EDE8   /* Warm off-white — primary text */
--color-text-secondary: #9A9FA8   /* Muted body copy */
--color-text-muted:     #525A68   /* Labels, captions */

--color-border:         rgba(255,255,255,0.06)
--color-border-accent:  rgba(255,107,26,0.3)

--gradient-hero:        linear-gradient(135deg, #0A0D14 0%, #0D1929 60%, #1A1205 100%)
--gradient-saffron:     linear-gradient(90deg, #FF6B1A, #D4A853)
--gradient-cta:         linear-gradient(135deg, #FF6B1A 0%, #E85D10 100%)

---

## TYPOGRAPHY SYSTEM

Display Font:   "Cormorant Garamond" — Serif, used for hero headlines
                Feel: Regal, constitutional, editorial authority
                Weight: 300 (light) for big numbers / 700 (bold) for hero

UI Font:        "DM Sans" — Geometric sans-serif
                Feel: Clean, approachable, modern civic tech
                Weight: 400 (body) / 500 (labels) / 600 (buttons)

Accent Font:    "Tiro Devanagari" or "Noto Serif Devanagari"
                Use: Section headers or tag labels with Hindi words
                e.g., "न्याय" (Nyaya = Justice) as a background watermark

Type Scale:
  --text-xs:    11px / 1.4
  --text-sm:    13px / 1.5
  --text-base:  16px / 1.6
  --text-lg:    20px / 1.5
  --text-xl:    28px / 1.3
  --text-2xl:   42px / 1.15
  --text-3xl:   64px / 1.05
  --text-4xl:   96px / 0.95   ← Hero headline size

---

## GRID & SPACING

Canvas width:      1440px desktop  |  768px tablet  |  390px mobile
Content max-width: 1200px, centered
Columns:           12-col grid, 24px gutters
Section padding:   120px top/bottom (desktop) → 64px (mobile)
Component gap:     8 / 16 / 24 / 40 / 64 / 96px scale (8px base unit)
Border-radius:     4px (small) / 8px (card) / 12px (modal) / 9999px (pill)

---

## SECTION 1 — NAVIGATION BAR

Layout: Sticky top nav, 72px height, backdrop-filter: blur(12px), slight border-bottom.

LEFT   → Logo: Ashoka Chakra icon (24-spoked wheel, saffron) + "NyayaBot" in DM Sans 600
CENTER → Nav links: Home | How It Works | Features | About | Blog
RIGHT  → Ghost button: "Log In"  +  CTA button: "Try NyayaBot Free →" (saffron fill)

Nav link style: 14px DM Sans 400, --color-text-secondary
Active state: --color-saffron underline
CTA button: bg --gradient-cta, white text, pill border-radius, 40px height

---

## SECTION 2 — HERO (ABOVE THE FOLD)

Layout: Full viewport height. Two-column on desktop (60/40 split).
Left = headline + CTAs. Right = floating chat UI mockup.

Background: --gradient-hero + subtle noise texture overlay (4% opacity).
Large Devanagari word "न्याय" as a 400px faded watermark (opacity 3%) centered behind headline.

--- LEFT COLUMN ---

EYEBROW TAG:
  Pill chip — "🇮🇳  Powered by the Indian Constitution"
  bg: rgba(255,107,26,0.1), border: --color-border-accent
  font: 12px DM Sans 500, --color-saffron

HEADLINE (Cormorant Garamond 700, 80px, --color-text-primary):
  Line 1: "Every Indian Deserves"
  Line 2: "To Know Their Rights."
  Line 2 underlined with --gradient-saffron brush stroke

SUBHEADLINE (DM Sans 400, 20px, --color-text-secondary):
  "Ask NyayaBot any question about the Indian Constitution,
   Fundamental Rights, or legal provisions — and get clear,
   cited answers in seconds."

CTA GROUP (flex row, gap 16px, margin-top 40px):
  Primary CTA:   "Start Asking Now →"
                  bg: --gradient-cta, white text, 52px height, pill radius, DM Sans 600
  Secondary CTA: "Watch How It Works"
                  Ghost style — border: 1px --color-border, left play-circle icon (saffron)

SOCIAL PROOF (margin-top 48px):
  — 3 stacked user avatars (overlap 8px, 32px each)
  — "2,40,000+ queries answered" in 13px DM Sans 500
  — ★★★★★  "4.9 rating"

--- RIGHT COLUMN — CHAT UI MOCKUP ---

Card: bg --color-bg-surface, border: 1px --color-border, border-radius 16px
      box-shadow: 0 40px 80px rgba(0,0,0,0.5)
      Width: 480px, slight tilt: rotate(-2deg)

CHAT HEADER:
  — NyayaBot avatar (Ashoka Chakra icon, 32px, saffron glow)
  — "NyayaBot" text + "● Online" green dot
  — Top-right: minimize / maximize icons

USER BUBBLE (right-aligned, saffron bg, white text, pill):
  "क्या मेरे पास निःशुल्क कानूनी सहायता का अधिकार है?"
  [Translation tag: "Do I have a right to free legal aid?"]

BOT RESPONSE (left-aligned, --color-bg-elevated):
  "Yes. Under Article 39A of the Indian Constitution,
   the State shall provide free legal aid to ensure equal
   justice is not denied due to economic disability..."
  [Source badge: "Article 39A — Directive Principles"]

INPUT BAR:
  Placeholder: "Ask about your rights..."
  Send button: saffron circle with arrow icon
  Mic icon on left

---

## SECTION 3 — TRUST LOGOS STRIP

Layout: Full-width marquee scroll, 80px height. Dark bg, 1px top/bottom borders.

LABEL: "Trusted by students, lawyers & citizens across India"
        11px DM Sans 500, --color-text-muted, UPPERCASE, letter-spacing 0.12em

LOGO ROW (auto-scroll left):
  National Law University | Bar Council of India | Supreme Court of India |
  Daksh India | PRS Legislative Research | CLAT Consortium

Logos: Grayscale opacity 40%, hover: full opacity + scale(1.05)

---

## SECTION 4 — FEATURES

SECTION TAG: "What NyayaBot Does"  (same pill chip style)

HEADLINE (Cormorant Garamond 300, 52px):
  "Know the law.
   Exercise your rights."

3-COLUMN CARD GRID (gap: 8px, equal height):

CARD 1 — "Ask Any Legal Question"
  Icon: BalanceScale (saffron, 32px in 56px circle bg rgba(255,107,26,0.1))
  Body: "From Article 21 to POCSO — ask anything in plain language
         and get answers backed by actual constitutional text."

CARD 2 — "Cited, Verifiable Answers"
  Icon: BookOpen (gold-colored)
  Body: "Every response links back to its source — Article number,
         Amendment, or Landmark Judgment. Zero hallucination policy."

CARD 3 — "Hindi + English Support"
  Icon: Globe with India map pin
  Body: "Ask in Hindi or English. NyayaBot understands and responds
         in the language you're most comfortable with."

Card style: bg --color-bg-surface, border: 1px --color-border
            padding: 32px, border-radius: 12px
            hover: border-color --color-border-accent, translateY(-4px) ease 0.2s

---

## SECTION 5 — PRODUCT WALKTHROUGH

ROW 1 (Text Left / Visual Right):
  TAG:      "Step 01"
  HEADLINE: "Ask in plain language."  (Cormorant 700, 42px)
  BODY:     "No legal jargon needed. Type your situation the way you'd
              explain it to a friend. NyayaBot understands context."
  VISUAL:   Full chat window mockup — glowing border, depth shadow, hover parallax

ROW 2 (Visual Left / Text Right):
  TAG:      "Step 02"
  HEADLINE: "Get answers with sources."
  BODY:     "NyayaBot cites the exact Article, Amendment, or Court ruling
              behind every answer. Click any citation to read the original text."
  VISUAL:   Response card with citation panel open on the right

---

## SECTION 6 — TESTIMONIALS

SECTION LABEL: "Voices from Bharatvaasis"

CARD STRUCTURE (3-column):
  — Large opening " mark (Cormorant Garamond, 72px, --color-gold, opacity 30%)
  — Quote text: 16px DM Sans 400 italic
  — Author: Avatar circle (40px) + Name DM Sans 600 + Designation

CARD 1:
  Quote: "I finally understood my tenant rights when my landlord threatened
          to throw me out. NyayaBot cited Article 21 and Section 9 of the
          Transfer of Property Act in under 10 seconds."
  Author: Ramesh Verma, Delhi | Small Business Owner

CARD 2:
  Quote: "As a law student, I use it for constitutional law revision.
          The citations are always accurate and cross-verified."
  Author: Priya Nair, 3rd Year LLB | NLS Bangalore

CARD 3:
  Quote: "We integrated NyayaBot into our rural legal aid camp.
          Villagers could now ask questions in Hindi and get real answers."
  Author: Advocate Santosh Kumar | Bihar State Bar Council

---

## SECTION 7 — TRUST & CREDIBILITY

HEADLINE: "Built on constitutional truth. Not opinions."

LEFT — Body Text:
  NyayaBot's knowledge base is trained exclusively on:
  — The Constitution of India (as amended up to 2023)
  — All 104 Constitutional Amendments
  — Supreme Court landmark judgments (1950–present)
  — Law Commission Reports
  — Legal Aid Guidelines

RIGHT — 3 Stacked Badges:
  Badge 1: "Constitutionally Sourced"
            Icon: Pillar — "Only government-verified legal text"
  Badge 2: "No Hallucinations"
            Icon: ShieldCheck — "Answers only if source exists, else says I don't know"
  Badge 3: "Data Privacy"
            Icon: Lock — "Your queries are never stored or shared"

---

## SECTION 8 — CTA BLOCK (FULL WIDTH)

Background: #0A0D14 + radial-gradient(ellipse at center, rgba(255,107,26,0.12) 0%, transparent 70%)

OVERLINE TAG: "For every citizen. For free."

HEADLINE (Cormorant Garamond 700, 72px):
  "Your rights are written down."
  "Now you can read them."

SUBTEXT (DM Sans 400, 18px, --color-text-secondary):
  "Start asking NyayaBot — no signup needed to try."

CTA BUTTONS (centered, gap 16px):
  Primary:   "Ask Your First Question →"
  Secondary: "See Demo"  (ghost style)

BOTTOM MICRO-COPY (11px, --color-text-muted, center):
  "NyayaBot is an informational tool. It does not constitute legal advice.
   For legal matters, always consult a qualified advocate."

---

## SECTION 9 — FOOTER

5-COLUMN GRID:

COL 1 — Brand:
  Logo + tagline: "Nyaya for all. न्याय सबके लिए।"
  Social icons: Twitter/X, LinkedIn, Instagram (24px, --color-text-muted)

COL 2 — Product:
  How It Works | Features | Try Now | Pricing | API

COL 3 — Resources:
  Indian Constitution | Fundamental Rights | Legal Glossary | Blog

COL 4 — Company:
  About | Contact | Privacy Policy | Terms of Use

COL 5 — Language:
  Hindi | English  (Toggle pill component)

BOTTOM BAR:
  Left:  © 2025 NyayaBot. Made in India 🇮🇳
  Right: "Powered by AI trained on the Constitution of India"

---

## COMPONENT SPECS

BUTTON — PRIMARY
  bg: linear-gradient(135deg, #FF6B1A, #E85D10)
  text: #FFFFFF, 15px DM Sans 600
  height: 52px, padding: 0 28px, border-radius: 9999px
  hover: scale(1.02), brightness(1.1), box-shadow: 0 8px 24px rgba(255,107,26,0.35)
  active: scale(0.98)

BUTTON — GHOST
  bg: transparent, border: 1px solid rgba(255,255,255,0.12)
  text: #F0EDE8, 15px DM Sans 600
  hover: border-color rgba(255,107,26,0.5), text: --color-saffron

CHIP / TAG
  bg: rgba(255,107,26,0.08), border: 1px solid rgba(255,107,26,0.25)
  text: --color-saffron, 12px DM Sans 500
  padding: 4px 12px, border-radius: 9999px

CARD
  bg: #111520, border: 1px solid rgba(255,255,255,0.06)
  border-radius: 12px, padding: 32px
  hover: border --color-border-accent, transform: translateY(-4px)
  transition: all 0.25s ease

INPUT FIELD
  bg: #1A2035, border: 1px solid rgba(255,255,255,0.08)
  border-radius: 12px, height: 52px, padding: 0 20px
  text: #F0EDE8, 15px DM Sans 400
  focus: border --color-saffron, box-shadow: 0 0 0 3px rgba(255,107,26,0.15)
  placeholder: --color-text-muted

---

## MICRO-ANIMATIONS (Figma Prototyping Notes)

1. HERO HEADLINE  — stagger fade-in per line, 0.15s delay each, translateY(20px → 0)
2. CHAT MOCKUP    — floating loop: translateY 0 → -8px → 0, 4s ease-in-out infinite
3. LOGO MARQUEE   — auto-scroll left, infinite loop, 40s duration
4. FEATURE CARDS  — hover: card lifts translateY(-4px) + border glows saffron
5. CTA BUTTON     — subtle glow pulse on primary button, box-shadow animation 2s loop
6. CUSTOM CURSOR  — saffron dot (12px) + Ashoka Chakra ring (24px), follows cursor
7. NAV            — on-scroll: backdrop-blur increases, top border fades in

---

## FIGMA FILE STRUCTURE

📁 NyayaBot — Landing Page
   📁 _Design Tokens
      └── Colors, Typography, Spacing, Effects
   📁 _Components
      └── Button/Primary
      └── Button/Ghost
      └── Tag/Chip
      └── Card/Feature
      └── Card/Testimonial
      └── Nav/Desktop
      └── Chat/Mockup
      └── Input/Field
   📁 Pages
      └── 01_Desktop_1440
      └── 02_Tablet_768
      └── 03_Mobile_390
   📁 Prototype Flows
      └── Hero CTA → Chat page
      └── Nav → Sections (scroll)

---

## DESIGNER NOTE

The Legora reference uses extreme editorial confidence — massive type, cinematic dark backgrounds, and video mockups. NyayaBot should replicate that confidence but root it in Indian identity. The Ashoka Chakra is a geometric goldmine — use its 24-spoke structure as a background pattern, divider motif, and icon base. The goal: a citizen visiting this page should feel empowered, not intimidated.