import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';

export default function Impact() {
  const { lang } = useLanguage();
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <section className="py-16 bg-primary text-white border-y-4 border-accent relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-primary to-primary pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/20"
        >
          
          <motion.div variants={itemVariants} className="text-center py-4">
            <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-3 tracking-tight">1,500<span className="text-3xl lg:text-4xl ml-1">+</span></div>
            <p className="text-sm md:text-base uppercase tracking-widest text-white/90 font-semibold pb-2">{lang === 'en' ? 'Active Volunteers' : 'చురుకైన వాలంటీర్లు'}</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center py-4">
            <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-3 tracking-tight">46k<span className="text-3xl lg:text-4xl ml-1">+</span></div>
            <p className="text-sm md:text-base uppercase tracking-widest text-white/90 font-semibold pb-2">{lang === 'en' ? 'Global Club Connects' : 'గ్లోబల్ నెట్‌వర్క్'}</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center py-4">
            <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-3 tracking-tight">150<span className="text-3xl lg:text-4xl ml-1">+</span></div>
            <p className="text-sm md:text-base uppercase tracking-widest text-white/90 font-semibold pb-2">{lang === 'en' ? 'Local Projects Done' : 'స్థానిక ప్రాజెక్టులు'}</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center py-4">
            <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-3 tracking-tight">10k<span className="text-3xl lg:text-4xl ml-1">+</span></div>
            <p className="text-sm md:text-base uppercase tracking-widest text-white/90 font-semibold pb-2">{lang === 'en' ? 'Lives Impacted in AP' : 'ప్రభావిత జీవితాలు'}</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
