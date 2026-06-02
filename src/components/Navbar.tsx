import { useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { motion } from "motion/react";
import logoImage from "../../assets/logo/logo_123.jpeg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();

  const navItems = [
    { id: "home", en: "Home", te: "హోమ్" },
    { id: "leadership", en: "Leadership", te: "నాయకత్వం" },
    { id: "regions-&-zones", en: "Regions & Zones", te: "ప్రాంతాలు & మండలాలు" },
    { id: "global-causes", en: "Global Causes", te: "ప్రపంచ లక్ష్యాలు" },
    { id: "gallery", en: "Gallery", te: "చిత్రమాలిక" },
    { id: "contact", en: "Contact", te: "సంప్రదించండి" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-4">
            <img
              src={logoImage}
              alt="Lions International District 316-G Logo"
              className="h-16 w-auto object-contain"
            />
            <span className="font-display font-bold text-[18px] leading-[20px] tracking-wide">
              {lang === "en" ? "Lions International" : "లయన్స్ ఇంటర్నేషనల్"}{" "}
              <span className="text-accent ml-1 mr-1">|</span>{" "}
              {lang === "en" ? "District 316-G" : "జిల్లా 316-G"}
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-white hover:text-accent font-medium text-xs xl:text-sm transition-colors uppercase tracking-wider">
                {lang === "en" ? item.en : item.te}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-white hover:text-accent font-bold text-xs bg-white/10 px-3 py-1.5 rounded-full border border-white/20 transition-colors uppercase cursor-pointer">
              <Languages className="w-4 h-4" />
              {lang === "en" ? "తెలుగు" : "ENG"}
            </button>
            <a
              href="#create-profile"
              className="bg-accent hover:bg-accent-hover text-primary font-bold py-2.5 px-6 rounded shadow-md transition-colors uppercase text-xs xl:text-sm">
              {lang === "en" ? "Create Member Profile" : "ప్రొఫైల్ సృష్టించండి"}
            </a>
          </div>

          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-white hover:text-accent font-bold text-xs bg-white/10 px-2 py-1.5 rounded border border-white/20 transition-colors uppercase cursor-pointer">
              <Languages className="w-4 h-4" />
              {lang === "en" ? "తె" : "EN"}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent focus:outline-none p-2 cursor-pointer">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-primary pb-6 px-4 shadow-inner">
          <div className="flex flex-col space-y-4 pt-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-white hover:text-accent font-medium text-base uppercase px-2 py-1"
                onClick={() => setIsOpen(false)}>
                {lang === "en" ? item.en : item.te}
              </a>
            ))}
            <a
              href="#create-profile"
              className="bg-accent text-primary font-bold py-3 px-4 rounded text-center uppercase tracking-wide mt-4"
              onClick={() => setIsOpen(false)}>
              {lang === "en" ? "Create Member Profile" : "ప్రొఫైల్ సృష్టించండి"}
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
