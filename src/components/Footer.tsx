import { Mail, MapPin, Clock, Phone } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { motion } from "motion/react";
import logoImage from "../../assets/logo/logo_123.jpeg";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer
      id="contact"
      className="bg-[#002244] text-white pt-16 pb-8 border-t-8 border-accent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="flex items-start gap-4 mb-6">
              <img
                src={logoImage}
                alt="Lions International District 316-G Logo"
                className="h-20 w-auto object-contain flex-shrink-0"
              />
              <span className="font-display font-bold text-2xl tracking-wide block">
                {lang === "en" ? "Lions International" : "లయన్స్ ఇంటర్నేషనల్"}{" "}
                <br />{" "}
                <span className="text-accent text-xl font-sans mt-1 inline-block">
                  {lang === "en" ? "District 316-G" : "జిల్లా 316-G"}
                </span>
              </span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              {lang === "en"
                ? "Empowering communities across Andhra Pradesh through active service, leadership, and humanitarian aid."
                : "చురుకైన సేవ, నాయకత్వం మరియు మానవతా సహాయం ద్వారా ఆంధ్రప్రదేశ్ వ్యాప్తంగా కమ్యూనిటీలను శక్తివంతం చేయడం."}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-accent hover:text-primary hover:border-accent transition-all text-white/80">
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-accent hover:text-primary hover:border-accent transition-all text-white/80">
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <h4 className="text-lg font-bold text-accent mb-6 font-display tracking-wide uppercase">
              {lang === "en" ? "Contact Matrix" : "సంప్రదింపు వివరాలు"}
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="bg-white/5 p-2 rounded mr-4">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <span className="text-white/80 leading-relaxed">
                  Flat/Door/Block No.:23A-6-13, Subbarao dasika,
                  <br />
                  RRPet, Block - A, Sankara matham street,
                  <br />
                  Eluru, ANDHRA PRADESH Eluru District, 534001
                </span>
              </li>
              <li className="flex items-center">
                <div className="bg-white/5 p-2 rounded mr-4">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <a
                  href="tel:+919848133351"
                  className="text-white/80 hover:text-accent font-medium transition-colors">
                  +91 98481 33351
                </a>
              </li>
              <li className="flex items-center">
                <div className="bg-white/5 p-2 rounded mr-4">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <a
                  href="mailto:distoff2627@gmail.com"
                  className="text-white/80 hover:text-accent font-medium transition-colors">
                  distoff2627@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}>
            <h4 className="text-lg font-bold text-accent mb-6 font-display tracking-wide uppercase">
              {lang === "en" ? "Operating Hours" : "పనివేళలు"}
            </h4>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
              <div className="flex items-start mb-6">
                <Clock className="h-5 w-5 text-accent mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white mb-1">
                    {lang === "en" ? "Monday – Saturday" : "సోమవారం - శనివారం"}
                  </h5>
                  <p className="text-white/70 font-medium">
                    08:00 AM – 08:00 PM
                  </p>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-6"></div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-white/30 mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white mb-1">
                    {lang === "en" ? "Sunday" : "ఆదివారం"}
                  </h5>
                  <p className="text-white/70 font-medium">
                    09:00 AM – 06:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center text-white/50 text-sm font-medium">
          <p>
            {lang === "en"
              ? "Copyright © 2026 Lions District 316-G. All Rights Reserved."
              : "కాపీరైట్ © 2026 లయన్స్ జిల్లా 316-G. సర్వ హక్కులు ప్రత్యేకించబడినవి."}
          </p>
          <p className="mt-2 md:mt-0">
            {lang === "en"
              ? "Powered by RS Cubes, Eluru"
              : "RS క్యూబ్స్ ద్వారా, Eluru"}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
