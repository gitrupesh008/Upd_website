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
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
    <LanguageProvider>
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
      </main>
      <Footer />
      <BackToTop />
    </div>
    </LanguageProvider>
  );
}
