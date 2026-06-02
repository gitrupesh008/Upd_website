import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { UserPlus, User, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Member {
  id: string;
  name: string;
  phone: string;
  address: string;
  date: string;
}

export default function MemberRegistration() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [members, setMembers] = useState<Member[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lions_members');
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new member
    const newMember: Member = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleDateString()
    };

    // Update website state (localStorage)
    const updatedMembers = [newMember, ...members];
    setMembers(updatedMembers);
    localStorage.setItem('lions_members', JSON.stringify(updatedMembers));
    
    // Launch mailto link to send details to email address
    const subject = encodeURIComponent(`New Member Registration: ${formData.name}`);
    const body = encodeURIComponent(`Please register the following new member:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}`);
    window.location.href = `mailto:distoff2627@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setFormData({ name: '', phone: '', address: '' });
    
    // Reset success message
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="create-profile" className="py-24 bg-white scroll-mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
           <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            {lang === 'en' ? 'Create Member Profile' : 'సభ్యుల ప్రొఫైల్‌ను సృష్టించండి'}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === 'en' 
              ? 'Join our community of volunteers. Register below and your information will be shared with the district office and displayed as a newly joined member.' 
              : 'మా వాలంటీర్ల సంఘంలో చేరండి. క్రింద నమోదు చేసుకోండి మరియు మీ సమాచారం జిల్లా కార్యాలయానికి పంపబడుతుంది.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-ivory p-8 rounded-xl shadow-lg border-t-4 border-accent"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {lang === 'en' ? 'Registration Successful!' : 'నమోదు విజయవంతమైంది!'}
                </h3>
                <p className="text-gray-600">
                  {lang === 'en' ? 'Your details have been registered and your email client has been opened to send the notification.' : 'మీ వివరాలు నమోదు చేయబడ్డాయి మరియు నోటిఫికేషన్ పంపడానికి మీ ఇమెయిల్ తెరవబడింది.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                    {lang === 'en' ? 'Full Name' : 'పూర్తి పేరు'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-accent bg-white transition-colors outline-none"
                      placeholder={lang === 'en' ? 'Enter your full name' : 'మీ పూర్తి పేరును నమోదు చేయండి'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                    {lang === 'en' ? 'Phone Number' : 'ఫోన్ నంబర్'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-accent bg-white transition-colors outline-none"
                      placeholder={lang === 'en' ? 'Enter your phone number' : 'మీ ఫోన్ నంబర్‌ను నమోదు చేయండి'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                    {lang === 'en' ? 'Address' : 'చిరునామా'}
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-accent bg-white transition-colors outline-none"
                      placeholder={lang === 'en' ? 'Enter your full address' : 'మీ పూర్తి చిరునామాను నమోదు చేయండి'}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded transition-colors flex justify-center items-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-5 h-5" />
                  {lang === 'en' ? 'Register & Send Details' : 'నమోదు చేసి వివరాలను పంపండి'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Members List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <UserPlus className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold text-primary font-display">
                {lang === 'en' ? 'Recently Registered Members' : 'ఇటీవల నమోదు చేయబడిన సభ్యులు'}
              </h3>
            </div>
            
            {members.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded p-8 text-center text-gray-500 italic">
                {lang === 'en' ? 'No recent member registrations yet. Be the first!' : 'ఇటీవలి సభ్యుల నమోదులు లేవు. మొదటివారవ్వండి!'}
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {members.map((member) => (
                  <div key={member.id} className="bg-white p-5 rounded shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between sm:items-start gap-4 hover:border-accent transition-colors">
                    <div>
                      <h4 className="font-bold text-primary text-lg">{member.name}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {member.phone}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> {member.address}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-primary px-3 py-1 bg-accent rounded-full whitespace-nowrap self-start">
                      {lang === 'en' ? 'Joined' : 'చేరారు'} {member.date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
