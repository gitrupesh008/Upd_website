import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Calendar as CalendarIcon, MapPin, Clock, ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import { motion } from 'motion/react';

const eventsData = [
  {
    id: 1,
    title_en: 'Mega Blood Donation Camp',
    title_te: 'మెగా రక్తదాన శిబిరం',
    date: '2026-06-15',
    time: '09:00 AM - 02:00 PM',
    location_en: 'Lions Community Hall, Visakhapatnam',
    location_te: 'లయన్స్ కమ్యూనిటీ హాల్, విశాఖపట్నం',
    description_en: 'Join us for a district-wide blood donation drive to help local hospitals.',
    description_te: 'స్థానిక ఆసుపత్రులకు సహాయం చేయడానికి మా జిల్లా వ్యాప్త రక్తదాన శిబిరంలో చేరండి.',
    category: 'Health'
  },
  {
    id: 2,
    title_en: 'Eye Screening Workshop',
    title_te: 'నేత్ర పరీక్షల శిబిరం',
    date: '2026-06-22',
    time: '10:00 AM - 04:00 PM',
    location_en: 'Govt School, Rajahmundry',
    location_te: 'ప్రభుత్వ పాఠశాల, రాజమండ్రి',
    description_en: 'Free eye screening and glasses distribution for school children.',
    description_te: 'పాఠశాల పిల్లలకు ఉచిత నేత్ర పరీక్ష మరియు కళ్లద్దాల పంపిణీ.',
    category: 'Health'
  },
  {
    id: 3,
    title_en: 'Tree Plantation Drive',
    title_te: 'మొక్కలు నాటే కార్యక్రమం',
    date: '2026-07-05',
    time: '08:00 AM - 12:00 PM',
    location_en: 'City Park, Kakinada',
    location_te: 'సిటీ పార్క్, కాకినాడ',
    description_en: 'Environmental initiative to plant 1000 saplings across the city.',
    description_te: 'నగరం అంతటా 1000 మొక్కలు నాటే పర్యావరణ చొరవ.',
    category: 'Environment'
  },
  {
    id: 4,
    title_en: 'Youth Leadership Seminar',
    title_te: 'యువజన నాయకత్వ సదస్సు',
    date: '2026-07-18',
    time: '09:30 AM - 05:00 PM',
    location_en: 'Grand Hotel, Vijayawada',
    location_te: 'గ్రాండ్ హోటల్, విజయవాడ',
    description_en: 'Empowering the next generation of leaders through interactive workshops.',
    description_te: 'ఇంటరాక్టివ్ వర్క్‌షాప్‌ల ద్వారా తదుపరి తరం నాయకులను శక్తివంతం చేయడం.',
    category: 'Education'
  }
];

export default function EventCalendar() {
  const { lang } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date("2026-06-01"));

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const formattedMonth = currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // Filter events for the current month
  const currentMonthEvents = eventsData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth.getMonth() && eventDate.getFullYear() === currentMonth.getFullYear();
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="events" className="py-24 bg-gray-50 border-t border-gray-200 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
           <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4 flex items-center justify-center gap-3">
             <CalendarIcon className="w-8 h-8 text-accent" />
            {lang === 'en' ? 'Upcoming Events' : 'రాబోయే కార్యక్రమాలు'}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed print:hidden">
            {lang === 'en' 
              ? 'Join us in our upcoming service activities and community gatherings. Find an event near you and be part of the change.' 
              : 'మా జిల్లా రాబోయే సేవా కార్యక్రమాలు మరియు సమావేశాలలో మాతో చేయి కలపండి. మీకు సమీపంలో ఉన్న కార్యక్రమాన్ని కనుగొనండి.'}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100 print:hidden">
            <div className="flex items-center gap-4">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-primary cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold text-primary font-display min-w-[200px] text-center">{formattedMonth}</h3>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-primary cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-5 h-5" />
              {lang === 'en' ? 'Print Month' : 'నెల ప్రింట్ చేయండి'}
            </button>
          </div>

          <div className="hidden print:block text-2xl font-bold text-primary mb-6 text-center">
            {lang === 'en' ? `Events for ${formattedMonth}` : `${formattedMonth} ఈవెంట్స్`}
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {currentMonthEvents.length > 0 ? (
              currentMonthEvents.map((event, index) => {
                const eventDate = new Date(event.date);
                const day = eventDate.getDate();
                const dayName = eventDate.toLocaleString('en-US', { weekday: 'short' });
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={event.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row group"
                  >
                    {/* Date Block */}
                    <div className="bg-primary text-white w-full sm:w-32 flex flex-row sm:flex-col items-center justify-center p-4 py-3 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/20 group-hover:bg-accent group-hover:text-primary transition-colors">
                      <span className="text-sm font-bold uppercase tracking-widest sm:mb-1 mr-2 sm:mr-0">{dayName}</span>
                      <span className="text-3xl sm:text-5xl font-display font-bold leading-none">{day}</span>
                    </div>
                    
                    {/* Event Details */}
                    <div className="p-6 sm:p-8 flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">
                          {event.category}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-primary mb-3">
                        {lang === 'en' ? event.title_en : event.title_te}
                      </h4>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {lang === 'en' ? event.description_en : event.description_te}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>{lang === 'en' ? event.location_en : event.location_te}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-12 rounded-xl border border-gray-100 text-center shadow-sm"
              >
                <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-600 mb-2">
                  {lang === 'en' ? 'No events scheduled' : 'ఎలాంటి కార్యక్రమాలు షెడ్యూల్ చేయబడలేదు'}
                </h4>
                <p className="text-gray-500">
                  {lang === 'en' ? `There are no events planned for ${formattedMonth}.` : `ఈ నెలలో ఎలాంటి సేవా కార్యక్రమాలు ప్లాన్ చేయబడలేదు.`}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
