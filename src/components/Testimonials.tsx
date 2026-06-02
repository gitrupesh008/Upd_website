import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name_en: "Ramanamma",
    name_te: "రమణమ్మ",
    location_en: "Guntur",
    location_te: "గుంటూరు",
    text_en: "The Lions free eye screening camp helped me get my vision back. The doctors were incredibly kind and the cataract surgery was completely free.",
    text_te: "లయన్స్ ఉచిత కంటి పరీక్షల శిబిరం నాకు చూపును తిరిగి ఇచ్చింది. వైద్యులు చాలా దయతో ఉన్నారు మరియు కంటి శుక్లం నివారణ శస్త్రచికిత్స పూర్తిగా ఉచితం."
  },
  {
    id: 2,
    name_en: "Srinivas Rao",
    name_te: "శ్రీనివాస్ రావు",
    location_en: "Vijayawada",
    location_te: "విజయవాడ",
    text_en: "When the floods hit our village, the Lions Club volunteers were the first to arrive with food and emergency supplies. We are forever grateful.",
    text_te: "మా గ్రామంలో వరదలు వచ్చినప్పుడు, లయన్స్ క్లబ్ వాలంటీర్లు మొదట ఆహారం మరియు అత్యవసర సామాగ్రిని అందించారు. మేము ఎల్లప్పుడూ కృతజ్ఞులమై ఉంటాము."
  },
  {
    id: 3,
    name_en: "Kavitha",
    name_te: "కవిత",
    location_en: "Rajahmundry",
    location_te: "రాజమండ్రి",
    text_en: "The diabetes medication support my father receives from the district has been a huge relief for our family's finances. We thank them deeply.",
    text_te: "జిల్లా నుండి మా నాన్నగారు పొందుతున్న మధుమేహ మందుల మద్దతు మా కుటుంబ ఆర్థిక పరిస్థితికి చాలా ఉపశమనం కలిగించింది. వారికి మా హృదయపూర్వక ధన్యవాదాలు."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="py-20 bg-ivory relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Quote className="w-64 h-64 text-primary" />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            {lang === 'en' ? 'Community Voices' : 'ప్రజాభిప్రాయాలు'}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === 'en' 
              ? 'Hear from the people whose lives have been impacted by our dedicated volunteers.' 
              : 'మా వాలంటీర్ల అంకితభావం వలన ప్రయోజనం పొందిన వారి మాటల్లో వినండి.'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-2xl shadow-xl p-8 md:p-14 border-t-4 border-accent"
        >
          <div className="absolute top-6 left-8 text-accent opacity-20">
            <Quote className="w-16 h-16" />
          </div>
          
          <div className="min-h-[180px] flex items-center justify-center relative z-10">
            {testimonials.map((t, i) => (
              <div 
                key={t.id} 
                className={`transition-all duration-700 absolute w-full ${
                  i === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8 pointer-events-none'
                }`}
              >
                <div className="text-center px-4 md:px-12">
                  <p className="text-xl md:text-2xl text-gray-700 font-serif italic leading-relaxed mb-8">
                    "{lang === 'en' ? t.text_en : t.text_te}"
                  </p>
                  <div>
                    <h4 className="font-bold text-primary text-lg">
                      {lang === 'en' ? t.name_en : t.name_te}
                    </h4>
                    <p className="text-accent font-semibold uppercase tracking-widest text-sm mt-1">
                      {lang === 'en' ? t.location_en : t.location_te}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-12 gap-6">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-primary/5 hover:bg-primary text-primary hover:text-white transition-colors focus:outline-none cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer focus:outline-none ${
                    i === currentIndex ? 'bg-accent w-8' : 'bg-gray-300 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button 
               onClick={nextSlide}
               className="p-3 rounded-full bg-primary/5 hover:bg-primary text-primary hover:text-white transition-colors focus:outline-none cursor-pointer"
               aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
