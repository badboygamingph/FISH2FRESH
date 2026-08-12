import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

const Features = lazy(() => import('../components/Features'));
const VisualIndicators = lazy(() => import('../components/VisualIndicators'));
const Species = lazy(() => import('../components/Species'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const Team = lazy(() => import('../components/Team'));
const FAQ = lazy(() => import('../components/FAQ'));

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="min-h-screen"></div>}>
        <Features />
        <VisualIndicators />
        <Species />
        <HowItWorks />
        <Team />
        <FAQ />
      </Suspense>
    </>
  );
}
