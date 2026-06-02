import { useState } from 'react';
import { Users, MapPin, Building2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

const regionsData = [
  { id: 'I', name_en: 'Region I', name_te: 'ప్రాంతం I', desc_en: 'Covering key municipalities with dedicated community mobilization units.', desc_te: 'కమ్యూనిటీ మొబిలైజేషన్ యూనిట్లతో కీలక మునిసిపాలిటీలను పర్యవేక్షిస్తుంది.', zones: ['Zone-I', 'Zone-II', 'Zone-III', 'Zone-IV'] },
  { id: 'II', name_en: 'Region II', name_te: 'ప్రాంతం II', desc_en: 'Central administrative focus addressing structural and health initiatives.', desc_te: 'నిర్మాణాత్మక మరియు ఆరోగ్య కార్యక్రమాలను నిర్వహించే కేంద్ర పరిపాలనా విభాగం.', zones: ['Zone-I', 'Zone-II', 'Zone-III', 'Zone-IV'] },
  { id: 'III', name_en: 'Region III', name_te: 'ప్రాంతం III', desc_en: 'Extensive outreach operations mapped across vital civic centers.', desc_te: 'ప్రధాన పౌర కేంద్రాల వ్యాప్తంగా విస్తృతమైన సహాయ కార్యకలాపాలు.', zones: ['Zone-I', 'Zone-II', 'Zone-III', 'Zone-IV'] },
  { id: 'IV', name_en: 'Region IV', name_te: 'ప్రాంతం IV', desc_en: 'Deep community integration networks for rural and urban assistance.', desc_te: 'గ్రామీణ మరియు పట్టణ సహాయం కోసం లోతైన కమ్యూనిటీ ఏకీకరణ నెట్‌వర్క్‌లు.', zones: ['Zone-I', 'Zone-II', 'Zone-III', 'Zone-IV'] },
  { id: 'V', name_en: 'Region V', name_te: 'ప్రాంతం V', desc_en: 'Metropolitan hub managing swift disaster relief and core logistics.', desc_te: 'విపత్తు ఉపశమనం మరియు వనరులను నిర్వహించే మెట్రోపాలిటన్ కేంద్రం.', zones: ['Zone-I', 'Zone-II', 'Zone-III', 'Zone-IV'] },
];

export default function Regions() {
  const [activeRegion, setActiveRegion] = useState(regionsData[0].id);
  const { lang } = useLanguage();

  return (
    <section id="regions-&-zones" className="py-24 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            {lang === 'en' ? 'Administrative Structure' : 'పరిపాలనా నిర్మాణం'}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === 'en' ? 'Our district is organized into five distinct regions to effectively manage our active volunteer base and coordinate community upliftment initiatives across Andhra Pradesh.' : 'ఆంధ్రప్రదేశ్ వ్యాప్తంగా మా కార్యకలాపాలను సమర్థవంతంగా నిర్వహించడానికి మా జిల్లా ఐదు విభిన్న ప్రాంతాలుగా విభజించబడింది.'}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3 flex flex-col space-y-3"
          >
            {regionsData.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={`text-left px-6 py-5 rounded font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                  activeRegion === region.id 
                    ? 'bg-primary text-white shadow-xl scale-105 border-primary z-10 relative' 
                    : 'bg-ivory text-primary hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>{lang === 'en' ? region.name_en : region.name_te}</span>
                <MapPin className={`h-5 w-5 ${activeRegion === region.id ? 'text-accent' : 'text-gray-400'}`} />
              </button>
            ))}
          </motion.div>
          
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              {regionsData.map((region) => (
                region.id === activeRegion && (
                  <motion.div 
                    key={region.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-ivory border border-gray-200 rounded-xl p-8 lg:p-10 shadow-sm"
                  >
                    <div className="flex items-start gap-5 mb-8">
                      <div className="bg-primary/10 p-4 rounded-full">
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">{lang === 'en' ? `${region.name_en} Overview` : `${region.name_te} అవలోకనం`}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{lang === 'en' ? region.desc_en : region.desc_te}</p>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-primary mb-5 border-b border-gray-200 pb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-accent" />
                  {lang === 'en' ? 'Sub-Administrative Zones' : 'ఉప-పరిపాలనా మండలాలు'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {region.zones.map((zone) => (
                    <div key={zone} className="bg-white p-5 rounded shadow-sm flex items-center justify-between border border-gray-100 hover:border-accent/50 transition-colors pointer-events-none">
                      <span className="font-bold text-primary text-lg">{zone}</span>
                      <div className="h-2 w-2 rounded-full bg-accent"></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-primary text-white p-8 rounded-lg relative overflow-hidden shadow-lg border-b-4 border-accent">
                  <div className="absolute -right-6 -bottom-6 opacity-10">
                    <MapPin className="h-40 w-40" />
                  </div>
                  <h5 className="font-bold text-accent mb-3 uppercase tracking-widest text-sm relative z-10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                    {lang === 'en' ? 'Regional Mandate' : 'ప్రాంతీయ బాధ్యత'}
                  </h5>
                  <p className="relative z-10 text-lg text-white/90 leading-relaxed max-w-xl">
                    {lang === 'en' 
                      ? `Empowering local leaders in ${region.name_en} to conduct swift disaster relief, organize comprehensive medical checkups, and mobilize active youth volunteer drives across the network.`
                      : `${region.name_te} పరిధిలో వైద్య శిబిరాలు, విపత్తు ఉపశమనం మరియు స్వచ్ఛంద కార్యక్రమాలను నిర్వహించడానికి స్థానిక నాయకులను ఉత్సాహపరచడం.`}
                  </p>
                </div>
              </motion.div>
                )
            ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
