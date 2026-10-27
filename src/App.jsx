import { useEffect } from 'react';
import { ScrollTrigger } from './animations/gsap';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import WhyChooseUsSection from './components/sections/WhyChooseUsSection';
import ServicesWheelSection from './components/sections/ServicesWheelSection';
import ServiceAreasSection from './components/sections/ServiceAreasSection';
import PartnersSection from './components/sections/PartnersSection';
import ReviewsThreadSection from './components/sections/ReviewsThreadSection';
import ServiceRequestForm from './components/layout/ServiceRequestForm';

export default function App() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 400);
    window.addEventListener('load', refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', refresh);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <HeroSection />
        <WhyChooseUsSection />
        <ServicesWheelSection />
        <ServiceAreasSection />
        <PartnersSection />
        <ReviewsThreadSection />
      </main>

      <ServiceRequestForm />
      <Footer />
    </>
  );
}
