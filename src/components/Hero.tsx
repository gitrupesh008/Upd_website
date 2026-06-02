import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1593113551525-450f1d643d9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    caption_en: "Medical Screening Camp",
    caption_te: "వైద్య పరీక్షల శిబిరం"
  },
  {
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    caption_en: "Comprehensive Eye Checkup Drive",
    caption_te: "సమగ్ర నేత్ర పరీక్షల ప్రాజెక్టు"
  },
  {
    url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    caption_en: "Humanitarian Relief Distribution",
    caption_te: "మానవతా సహాయం పంపిణీ"
  },
  {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    caption_en: "District Blood Donation Drive",
    caption_te: "జిల్లా రక్తదాన శిబిరం"
  }
];

export default function Hero() {
  const { lang } = useLanguage();
  return (
    <section id="home" className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden muggulu-pattern bg-primary/5">
      <div className="absolute inset-0 z-0 bg-primary/95">
        <img 
          src="https://images.unsplash.com/photo-1593113551525-450f1d643d9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Medical Camp Volunteers" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-6 leading-tight">
            {lang === 'en' ? 'WE WILL TRY TO CHANGE THE WORLD WITH LOVE & SERVE' : 'ప్రేమ మరియు సేవతో ఈ ప్రపంచాన్ని మార్చడానికి మనము ప్రయత్నిద్దాము'}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-sans max-w-3xl mx-auto">
            {lang === 'en' ? 'Welcome to District 316-G. Empowering communities across Andhra Pradesh through local volunteerism, life-changing medical camps, and dedicated humanitarian service.' : 'జిల్లా 316-G కి స్వాగతం. స్థానిక స్వచ్ఛంద సేవ, వైద్య శిబిరాలు మరియు అంకితభావంతో కూడిన మానవతా సేవల ద్వారా ఆంధ్రప్రదేశ్‌లోని ప్రజలను శక్తివంతం చేస్తున్నాము.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroCarousel />
        </motion.div>

        <div id="leadership" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 scroll-mt-24">
          <LeaderCard 
            name="PMJF Ln. N.V.V.S. Paparao Naidu Garu" 
            title={lang === 'en' ? "District Governor (2025-2026)" : "జిల్లా గవర్నర్ (2025-2026)"}
            delay={0.1}
          />
          <LeaderCard 
            name="PMJF Ln. Dr. Dasika Subba Rao Garu" 
            title={lang === 'en' ? "First Vice District Governor" : "మొదటి వైస్ డిస్ట్రిక్ట్ గవర్నర్"}
            delay={0.2}
          />
          <LeaderCard 
            name="PMJF Ln. R.V.S. Suryanarayana Raju" 
            title={lang === 'en' ? "Second Vice District Governor" : "రెండవ వైస్ డిస్ట్రిక్ట్ గవర్నర్"}
            delay={0.3}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-ivory p-8 md:p-12 rounded shadow-2xl border-t-4 border-accent relative text-primary"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-primary p-3 rounded-full shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
            </svg>
          </div>
          <blockquote className="text-xl md:text-2xl text-center text-primary font-display italic mt-4 leading-relaxed">
            {lang === 'en' ? '"Lives of Great Men all remind us we may make our lives sublime, And departing, leave behind us Footprints on the sand of time."' : '"గొప్పవారి జీవితాలు మన జీవితాలను ఉన్నతంగా మలుచుకోగలవని గుర్తుచేస్తాయి, మరియు వారు వెళుతూ, కాలగర్భంలో వారి అడుగుజాడలను వదిలివెళతారు."'}
          </blockquote>
          <p className="text-center mt-6 font-bold text-primary/80 uppercase tracking-widest text-sm">{lang === 'en' ? '— Melvin Jones, Founder of Lions Clubs International' : '— మెల్విన్ జోన్స్, లయన్స్ క్లబ్స్ ఇంటర్నేషనల్ వ్యవస్థాపకులు'}</p>
        </motion.div>
      </div>
    </section>
  );
}

function LeaderCard({ name, title, delay = 0 }: { name: string, title: string, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg overflow-hidden shadow-xl border border-primary/10 hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="p-8 md:p-10 text-center border-t-8 border-accent bg-ivory">
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 min-h-[64px] flex items-center justify-center leading-snug">{name}</h3>
        <p className="text-sm md:text-base text-primary/80 uppercase font-bold tracking-wider">{title}</p>
      </div>
    </motion.div>
  );
}

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-20 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-primary/20 group">
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
        {galleryImages.map((img, i) => (
          <div 
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img 
              src={img.url} 
              alt={lang === 'en' ? img.caption_en : img.caption_te} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 drop-shadow-lg">
                {lang === 'en' ? img.caption_en : img.caption_te}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-opacity opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-opacity opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2.5 rounded-full transition-all focus:outline-none cursor-pointer ${
              i === currentIndex ? 'bg-accent w-8' : 'bg-white/50 w-2.5 hover:bg-white/80'
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
