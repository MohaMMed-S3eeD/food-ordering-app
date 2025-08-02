import About from "./_components/About";
import BestSeller from "./_components/BestSeller";
import Contact from "./_components/Contact";
import Features from "./_components/Features";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <BestSeller />
      <Features />
      <About />
      <Testimonials />
      <Contact />
    </main>
  );
}
