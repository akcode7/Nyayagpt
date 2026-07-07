import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hi";

// ─── All translations ──────────────────────────────────────────────────────
export const translations = {
  en: {
    // Navbar
    navHome: "Home",
    navHowItWorks: "How It Works",
    navFeatures: "Features",
    navAbout: "About",
    navBlog: "Blog",
    navLogin: "Log In",
    navTryFree: "Try NyayaGPT Free →",
    navTryFreeMobile: "Try Free →",

    // Hero
    heroEyebrow: "🇮🇳\u00a0 Powered by the Indian Constitution",
    heroHeadline1: "Every Indian Deserves",
    heroHeadline2: "To Know Their Rights.",
    heroSub: "Ask NyayaGPT any question about the Indian Constitution, Fundamental Rights, or legal provisions — and get clear, cited answers in seconds.",
    heroCta1: "Start Asking Now →",
    heroCta2: "Watch How It Works",
    heroSocialQueries: "2,40,000+ queries answered",
    heroSocialRating: "4.9 rating",
    heroChatHeader: "NyayaGPT",
    heroChatOnline: "Online",
    heroChatUserMsg: "क्या मेरे पास निःशुल्क कानूनी सहायता का अधिकार है?",
    heroChatUserMsgSub: "Do I have a right to free legal aid?",
    heroChatBotReply: "Yes. Under Article 39A of the Indian Constitution, the State shall provide free legal aid to ensure equal justice is not denied due to economic disability...",
    heroChatSource: "Article 39A — Directive Principles",
    heroChatTyping: "NyayaGPT is typing",
    heroChatPlaceholder: "Ask about your rights...",

    // TrustStrip
    trustStrip: "Trusted by students, lawyers & citizens across India",

    // Features
    featuresTag: "What NyayaGPT Does",
    featuresH1: "Know the law.",
    featuresH2: "Exercise your rights.",
    featuresSub: "Three powerful capabilities, one constitutional AI. Swipe through to explore what NyayaGPT does for every Indian citizen.",
    feat1Title: "Ask Any Legal Question",
    feat1Body: "From Article 21 to POCSO — ask anything in plain language and get answers backed by actual constitutional text.",
    feat2Title: "Cited, Verifiable Answers",
    feat2Body: "Every response links back to its source — Article number, Amendment, or Landmark Judgment. Zero hallucination policy.",
    feat3Title: "Hindi + English Support",
    feat3Body: "Ask in Hindi or English. NyayaGPT understands and responds in the language you're most comfortable with.",

    // Walkthrough
    walk1Step: "Step 01",
    walk1Headline: "Ask in plain language.",
    walk1Body: "No legal jargon needed. Type your situation the way you'd explain it to a friend. NyayaGPT understands context.",
    walk2Step: "Step 02",
    walk2Headline: "Get answers with sources.",
    walk2Body: "NyayaGPT cites the exact Article, Amendment, or Court ruling behind every answer. Click any citation to read the original text.",
    walkChatUserMsg: "If my employer doesn't pay salary, what can I do?",
    walkChatBotReply: "Under Article 23 (prohibition of forced labour) and the Payment of Wages Act, 1936, your employer is legally bound to pay wages on time...",
    walkChatCitation: "📜 Article 23 · Payment of Wages Act, 1936",
    walkChatPlaceholder: "Ask about your rights...",
    walkCitHeader: "NyayaGPT",
    walkCitOnline: "Online",
    walkCitBody: "The Right to Education under Article 21A guarantees free and compulsory education for children aged 6–14 years...",
    walkCitSources: "Sources",

    // Testimonials
    testimonialsLabel: "Voices from Bharatvaasis",
    testimonialsHeading: "What citizens are saying",
    test1Quote: "I finally understood my tenant rights when my landlord threatened to throw me out. NyayaGPT cited Article 21 and Section 9 of the Transfer of Property Act in under 10 seconds.",
    test1Name: "Ramesh Verma",
    test1Des: "Small Business Owner, Delhi",
    test2Quote: "As a law student, I use it for constitutional law revision. The citations are always accurate and cross-verified.",
    test2Name: "Priya Nair",
    test2Des: "3rd Year LLB · NLS Bangalore",
    test3Quote: "We integrated NyayaGPT into our rural legal aid camp. Villagers could now ask questions in Hindi and get real answers.",
    test3Name: "Advocate Santosh Kumar",
    test3Des: "Bihar State Bar Council",

    // TrustBadges
    tbWhy: "Why Trust NyayaGPT",
    tbH1: "Built on constitutional truth.",
    tbH2: "Not opinions.",
    tbSub: "NyayaGPT's knowledge base is trained exclusively on verified sources of Indian law:",
    tbSrc1: "The Constitution of India (as amended up to 2023)",
    tbSrc2: "All 104 Constitutional Amendments",
    tbSrc3: "Supreme Court landmark judgments (1950–present)",
    tbSrc4: "Law Commission Reports",
    tbSrc5: "Legal Aid Guidelines",
    tbVerified: "Verified & Accurate",
    tb1Title: "Constitutionally Sourced",
    tb1Body: "Only government-verified legal text — no third-party opinions or blogs.",
    tb2Title: "No Hallucinations",
    tb2Body: "Answers only if source exists; otherwise clearly states 'I don't know'.",
    tb3Title: "Data Privacy",
    tb3Body: "Your queries are never stored, sold, or shared with third parties.",

    // CTABlock
    ctaOverline: "For every citizen. For free.",
    ctaHeadline: "Know the law.|Exercise your rights.",
    ctaSub: "Start asking NyayaGPT — no signup needed to try.",
    ctaP1: "Ask Your First Question →",
    ctaP2: "Access Your Rights →",
    ctaD1: "See Demo",
    ctaD2: "▶ Watch 2-min tour",
    ctaDisc1: "NyayaGPT is an informational tool. It does not constitute legal advice.",
    ctaDisc2: "For legal matters, always consult a qualified advocate.",

    // Footer
    footerTagline: "Nyaya for all.",
    footerTaglineHi: "न्याय सबके लिए।",
    footerProduct: "Product",
    footerResources: "Resources",
    footerCompany: "Company",
    footerLanguage: "Language",
    footerLangAvail: "Available in English & Hindi",
    flHowItWorks: "How It Works",
    flFeatures: "Features",
    flTryNow: "Try Now",
    flPricing: "Pricing",
    flApi: "API",
    flConstitution: "Indian Constitution",
    flRights: "Fundamental Rights",
    flGlossary: "Legal Glossary",
    flBlog: "Blog",
    flAbout: "About",
    flContact: "Contact",
    flPrivacy: "Privacy Policy",
    flTerms: "Terms of Use",
  },
  hi: {
    // Navbar
    navHome: "मुख पृष्ठ",
    navHowItWorks: "यह कैसे काम करता है",
    navFeatures: "विशेषताएं",
    navAbout: "हमारे बारे में",
    navBlog: "ब्लॉग",
    navLogin: "लॉग इन",
    navTryFree: "न्यायाबॉट मुफ़्त आज़माएं →",
    navTryFreeMobile: "मुफ़्त आज़माएं →",

    // Hero
    heroEyebrow: "🇮🇳\u00a0 भारतीय संविधान द्वारा संचालित",
    heroHeadline1: "हर भारतीय को है",
    heroHeadline2: "अपने अधिकार जानने का हक।",
    heroSub: "भारतीय संविधान, मौलिक अधिकारों, या किसी भी कानूनी प्रावधान के बारे में कोई भी सवाल पूछें — और सेकंडों में स्पष्ट, उद्धृत उत्तर पाएं।",
    heroCta1: "अभी पूछना शुरू करें →",
    heroCta2: "देखें यह कैसे काम करता है",
    heroSocialQueries: "2,40,000+ प्रश्नों के उत्तर दिए",
    heroSocialRating: "4.9 रेटिंग",
    heroChatHeader: "न्यायाबॉट",
    heroChatOnline: "ऑनलाइन",
    heroChatUserMsg: "क्या मेरे पास निःशुल्क कानूनी सहायता का अधिकार है?",
    heroChatUserMsgSub: "क्या मुझे निःशुल्क कानूनी सहायता का अधिकार है?",
    heroChatBotReply: "हाँ। अनुच्छेद 39A के तहत राज्य निःशुल्क कानूनी सहायता प्रदान करेगा ताकि आर्थिक कारणों से न्याय न छूटे...",
    heroChatSource: "अनुच्छेद 39A — नीति निदेशक तत्व",
    heroChatTyping: "न्यायाबॉट टाइप कर रहा है",
    heroChatPlaceholder: "अपने अधिकारों के बारे में पूछें...",

    // TrustStrip
    trustStrip: "पूरे भारत के छात्रों, वकीलों और नागरिकों द्वारा विश्वसनीय",

    // Features
    featuresTag: "न्यायाबॉट क्या करता है",
    featuresH1: "कानून जानें।",
    featuresH2: "अपने अधिकारों का प्रयोग करें।",
    featuresSub: "तीन शक्तिशाली क्षमताएं, एक संवैधानिक AI। हर भारतीय नागरिक के लिए न्यायाबॉट क्या करता है, यह जानने के लिए एक्सप्लोर करें।",
    feat1Title: "कोई भी कानूनी सवाल पूछें",
    feat1Body: "अनुच्छेद 21 से POCSO तक — सरल भाषा में कुछ भी पूछें और वास्तविक संवैधानिक पाठ पर आधारित उत्तर पाएं।",
    feat2Title: "उद्धृत, सत्यापन योग्य उत्तर",
    feat2Body: "हर उत्तर अपने स्रोत से जुड़ा है — अनुच्छेद संख्या, संशोधन, या ऐतिहासिक निर्णय। शून्य मतिभ्रम नीति।",
    feat3Title: "हिंदी + अंग्रेज़ी समर्थन",
    feat3Body: "हिंदी या अंग्रेज़ी में पूछें। न्यायाबॉट आपकी सहज भाषा में समझता और जवाब देता है।",

    // Walkthrough
    walk1Step: "चरण 01",
    walk1Headline: "सरल भाषा में पूछें।",
    walk1Body: "कोई कानूनी शब्दजाल नहीं चाहिए। अपनी स्थिति उसी तरह लिखें जैसे आप किसी मित्र को समझाते। न्यायाबॉट संदर्भ समझता है।",
    walk2Step: "चरण 02",
    walk2Headline: "स्रोत सहित उत्तर पाएं।",
    walk2Body: "न्यायाबॉट हर उत्तर में सटीक अनुच्छेद, संशोधन, या न्यायालय के निर्णय का उल्लेख करता है। किसी भी उद्धरण पर क्लिक करके मूल पाठ पढ़ें।",
    walkChatUserMsg: "अगर मेरा नियोक्ता वेतन नहीं देता, तो मैं क्या कर सकता हूँ?",
    walkChatBotReply: "अनुच्छेद 23 और मजदूरी भुगतान अधिनियम, 1936 के तहत आपका नियोक्ता समय पर वेतन देने के लिए कानूनी रूप से बाध्य है...",
    walkChatCitation: "📜 अनुच्छेद 23 · मजदूरी भुगतान अधिनियम, 1936",
    walkChatPlaceholder: "अपने अधिकारों के बारे में पूछें...",
    walkCitHeader: "न्यायाबॉट",
    walkCitOnline: "ऑनलाइन",
    walkCitBody: "अनुच्छेद 21A के तहत शिक्षा का अधिकार 6-14 वर्ष के बच्चों को निःशुल्क और अनिवार्य शिक्षा की गारंटी देता है...",
    walkCitSources: "स्रोत",

    // Testimonials
    testimonialsLabel: "भारतवासियों की आवाज़",
    testimonialsHeading: "नागरिक क्या कह रहे हैं",
    test1Quote: "जब मेरे मकान मालिक ने मुझे बाहर निकालने की धमकी दी, तब न्यायाबॉट ने 10 सेकंड में अनुच्छेद 21 और संपत्ति हस्तांतरण अधिनियम की धारा 9 का उद्धरण दिया।",
    test1Name: "रमेश वर्मा",
    test1Des: "छोटे व्यवसाय स्वामी, दिल्ली",
    test2Quote: "एक कानून की छात्रा के रूप में, मैं इसका उपयोग संवैधानिक कानून के पुनरीक्षण के लिए करती हूँ। उद्धरण हमेशा सटीक और जाँचे हुए होते हैं।",
    test2Name: "प्रिया नायर",
    test2Des: "तृतीय वर्ष एलएलबी · एनएलएस बैंगलोर",
    test3Quote: "हमने न्यायाबॉट को ग्रामीण कानूनी सहायता शिविर में एकीकृत किया। अब ग्रामीण हिंदी में सवाल पूछ कर वास्तविक उत्तर पा सकते हैं।",
    test3Name: "अधिवक्ता संतोष कुमार",
    test3Des: "बिहार राज्य बार काउंसिल",

    // TrustBadges
    tbWhy: "न्यायाबॉट पर भरोसा क्यों",
    tbH1: "संवैधानिक सत्य पर निर्मित।",
    tbH2: "राय पर नहीं।",
    tbSub: "न्यायाबॉट का ज्ञान आधार विशेष रूप से भारतीय कानून के सत्यापित स्रोतों पर प्रशिक्षित है:",
    tbSrc1: "भारत का संविधान (2023 तक संशोधित)",
    tbSrc2: "सभी 104 संवैधानिक संशोधन",
    tbSrc3: "सर्वोच्च न्यायालय के ऐतिहासिक निर्णय (1950–अब तक)",
    tbSrc4: "विधि आयोग की रिपोर्ट",
    tbSrc5: "कानूनी सहायता दिशानिर्देश",
    tbVerified: "सत्यापित और सटीक",
    tb1Title: "संवैधानिक स्रोत",
    tb1Body: "केवल सरकार-सत्यापित कानूनी पाठ — कोई तृतीय-पक्ष राय या ब्लॉग नहीं।",
    tb2Title: "कोई मतिभ्रम नहीं",
    tb2Body: "उत्तर केवल तभी जब स्रोत मौजूद हो; अन्यथा स्पष्ट रूप से 'मुझे नहीं पता' कहता है।",
    tb3Title: "डेटा गोपनीयता",
    tb3Body: "आपके प्रश्न कभी संग्रहीत, बेचे या तृतीय पक्षों के साथ साझा नहीं किए जाते।",

    // CTABlock
    ctaOverline: "हर नागरिक के लिए। मुफ़्त।",
    ctaHeadline: "कानून जानें.|अपने अधिकार उपयोग करें.",
    ctaSub: "न्यायाबॉट से पूछना शुरू करें — आज़माने के लिए साइनअप की ज़रूरत नहीं।",
    ctaP1: "पहला सवाल पूछें →",
    ctaP2: "अपने अधिकार पाएं →",
    ctaD1: "डेमो देखें",
    ctaD2: "▶ 2-मिनट का दौरा देखें",
    ctaDisc1: "न्यायाबॉट एक सूचनात्मक उपकरण है। यह कानूनी सलाह नहीं है।",
    ctaDisc2: "कानूनी मामलों के लिए हमेशा योग्य अधिवक्ता से परामर्श करें।",

    // Footer
    footerTagline: "न्याय सबके लिए।",
    footerTaglineHi: "Nyaya for all.",
    footerProduct: "उत्पाद",
    footerResources: "संसाधन",
    footerCompany: "कंपनी",
    footerLanguage: "भाषा",
    footerLangAvail: "हिंदी और अंग्रेज़ी में उपलब्ध",
    flHowItWorks: "यह कैसे काम करता है",
    flFeatures: "विशेषताएं",
    flTryNow: "अभी आज़माएं",
    flPricing: "मूल्य निर्धारण",
    flApi: "एपीआई",
    flConstitution: "भारतीय संविधान",
    flRights: "मौलिक अधिकार",
    flGlossary: "कानूनी शब्दकोश",
    flBlog: "ब्लॉग",
    flAbout: "हमारे बारे में",
    flContact: "संपर्क करें",
    flPrivacy: "गोपनीयता नीति",
    flTerms: "उपयोग की शर्तें",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

// ─── Context ───────────────────────────────────────────────────────────────
interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => translations.en[key] as string,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: TranslationKey): string => {
    return (translations[lang][key] ?? translations.en[key] ?? key) as string;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
