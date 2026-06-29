import { useEffect, useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Regions from './components/Regions';
import Causes from './components/Causes';
import EventCalendar from './components/EventCalendar';
import Impact from './components/Impact';
import Gallery from './components/Gallery';
import MemberRegistration from './components/MemberRegistration';
import MonthlyBirthdays from './components/MonthlyBirthdays';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(() => window.location.hash === '#admin');

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminRoute(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  return (
    <LanguageProvider>
      {isAdminRoute ? (
        <AdminPanel />
      ) : (
        <div className="min-h-screen bg-ivory font-sans selection:bg-accent selection:text-primary scroll-smooth">
          <Navbar />
          <main>
            <Hero />
            <Testimonials />
            <Impact />
            <Regions />
            <Causes />
            <EventCalendar />
            <Gallery />
            <MemberRegistration />
            <MonthlyBirthdays />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </LanguageProvider>
  );
}
