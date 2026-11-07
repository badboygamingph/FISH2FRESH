import Hero from '../components/Hero';
import Features from '../components/Features';
import Tagline from '../components/Tagline';
import HowItWorks from '../components/HowItWorks';
import Species from '../components/Species';
import VisualIndicators from '../components/VisualIndicators';
import FAQ from '../components/FAQ';
import Team from '../components/Team';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Tagline />
      <HowItWorks />
      <Species />
      <VisualIndicators />
      <FAQ />
      <Team />
    </>
  );
}
