import { Eye, Activity, Utensils, Heart, TreePine, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';

const causes = [
  {
    icon: Eye,
    title_en: 'Vision & Eye Care',
    title_te: 'కంటి సంరక్షణ',
    desc_en: 'Conducting free eye screening camps, distributing glasses, and facilitating cataract surgeries across rural areas.',
    desc_te: 'గ్రామీణ ప్రాంతాల్లో ఉచిత కంటి పరీక్షల శిబిరాలు నిర్వహించడం మరియు అద్దాలు పంపిణీ చేయడం.',
  },
  {
    icon: Activity,
    title_en: 'Diabetes Awareness',
    title_te: 'మధుమేహం అవగాహన',
    desc_en: 'Organizing screening clinics, metabolic walks, and health education to combat diabetes in the community.',
    desc_te: 'మధుమేహాన్ని అరికట్టడానికి స్క్రీనింగ్ క్లినిక్‌లు మరియు ఆరోగ్య విద్యను నిర్వహించడం.',
  },
  {
    icon: Utensils,
    title_en: 'Hunger Relief',
    title_te: 'ఆకలి నిర్మూలన',
    desc_en: 'Running food distribution drives and community kitchens for vulnerable populations.',
    desc_te: 'బలహీన వర్గాల కోసం ఆహార పంపిణీ కార్యక్రమాలు మరియు కమ్యూనిటీ వంటశాలలు.',
  },
  {
    icon: Heart,
    title_en: 'Childhood Cancer Support',
    title_te: 'బాల్య క్యాన్సర్ మద్దతు',
    desc_en: 'Providing logistical, emotional, and financial assistance to affected families.',
    desc_te: 'ప్రభావిత కుటుంబాలకు అవసరమైన, భావోద్వేగ, మరియు ఆర్ధిక సహాయం అందించడం.',
  },
  {
    icon: TreePine,
    title_en: 'Environmental Protection',
    title_te: 'పర్యావరణ రక్షణ',
    desc_en: 'Leading local tree plantation drives and clean water initiatives to preserve our biosphere.',
    desc_te: 'మొక్కలు నాటడం మరియు పరిశుభ్రమైన నీటి కార్యక్రమాలను నిర్వహించడం.',
  },
  {
    icon: ShieldCheck,
    title_en: 'Humanitarian Service',
    title_te: 'మానవతా సేవ',
    desc_en: 'Responding swiftly to regional disaster relief and addressing structural community needs.',
    desc_te: 'ప్రాంతీయ విపత్తు ఉపశమనానికి వేగంగా స్పందించడం మరియు సంఘం అవసరాలను పరిష్కరించడం.',
  },
];

export default function Causes() {
  const { lang } = useLanguage();
  return (
    <section id="global-causes" className="py-24 bg-ivory muggulu-pattern scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            {lang === 'en' ? 'Core Global Service Causes' : 'ప్రధాన ప్రపంచ సేవా లక్ష్యాలు'}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === 'en' ? "Our district acts in alignment with Lions Clubs International to address the world's most pressing challenges." : 'ప్రపంచంలోని అత్యంత క్లిష్టమైన సవాళ్లను ఎదుర్కోవడానికి మా జిల్లా పనిచేస్తుంది.'}
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {causes.map((cause, index) => {
            const Icon = cause.icon;
            return (
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} key={index} className="bg-white rounded-xl overflow-hidden shadow border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-2 bg-gradient-to-r from-primary to-accent w-full transform origin-left scale-x-100 group-hover:scale-x-105 transition-transform duration-500"></div>
                <div className="p-8">
                  <div className="bg-ivory border-2 border-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 font-display">
                    {lang === 'en' ? cause.title_en : cause.title_te}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {lang === 'en' ? cause.desc_en : cause.desc_te}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
