import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About"
import OurCollection from '@/components/OurCollection';
import OurProcess from '@/components/OurProcess';
import WhyChooseUs from '@/components/WhyChooseUs';
import Certifications from '@/components/Certifications';
import Testimonials from '@/components/Testimonials';
import FreeSample from '@/components/FreeSample'
import Footer from '@/components/Footer';
import InspireSection from '@/components/InspireSection';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <OurCollection/>
      <OurProcess />
      <WhyChooseUs/>
      <Certifications/>
      <InspireSection/>
      <Testimonials/>
      <FreeSample/>
      <Footer/>
    </main>
  );
}