import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from '../seo';
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
      <Helmet>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta name="twitter:title" content={HOME_TITLE} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
      </Helmet>
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
