import { useState } from "react";
import { CalendarDays, CheckCircle2, MapPin, Phone, Send, User } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";
import { Member, readMembers, writeMembers } from "../data/members";

export default function MemberRegistration() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMember: Member = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleDateString(),
    };

    writeMembers([newMember, ...readMembers()]);

    const subject = encodeURIComponent(`New Member Registration: ${formData.name}`);
    const body = encodeURIComponent(
      `Please register the following new member:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nDate of Birth: ${formData.dob}\nAddress: ${formData.address}`,
    );
    window.location.href = `mailto:distoff2627@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setFormData({ name: "", phone: "", dob: "", address: "" });
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
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            {lang === "en" ? "Create Member Profile" : "Create Member Profile"}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {lang === "en"
              ? "Register below and your information will be shared with the district office."
              : "Register below and your information will be shared with the district office."}
          </p>
          <p className="text-primary font-semibold max-w-2xl mx-auto mt-4">
            {lang === "en"
              ? "Please update your date of birth so this month's birthday wishes can be displayed."
              : "Please update your date of birth so this month's birthday wishes can be displayed."}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-ivory p-8 rounded-xl shadow-lg border-t-4 border-accent">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {lang === "en" ? "Registration Successful!" : "Registration Successful!"}
                </h3>
                <p className="text-gray-600">
                  {lang === "en"
                    ? "Your details have been registered and your email client has been opened to send the notification."
                    : "Your details have been registered and your email client has been opened to send the notification."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block" htmlFor="name">
                  <span className="block text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                    Full Name
                  </span>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({ ...formData, name: event.target.value })
                      }
                      className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-accent bg-white transition-colors outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                </label>

                <label className="block" htmlFor="phone">
                  <span className="block text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                    Phone Number
                  </span>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(event) =>
                        setFormData({ ...formData, phone: event.target.value })
                      }
                      className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-accent bg-white transition-colors outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </label>

                <label className="block" htmlFor="dob">
                  <span className="block text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                    Date of Birth
                  </span>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      id="dob"
                      required
                      value={formData.dob}
                      onChange={(event) =>
                        setFormData({ ...formData, dob: event.target.value })
                      }
                      className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-accent bg-white transition-colors outline-none"
                    />
                  </div>
                </label>

                <label className="block" htmlFor="address">
                  <span className="block text-sm font-bold text-primary mb-2 uppercase tracking-wide">
                    Address
                  </span>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      id="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(event) =>
                        setFormData({ ...formData, address: event.target.value })
                      }
                      className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-accent bg-white transition-colors outline-none"
                      placeholder="Enter your full address"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded transition-colors flex justify-center items-center gap-2 cursor-pointer shadow-md">
                  <Send className="w-5 h-5" />
                  Register & Send Details
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

