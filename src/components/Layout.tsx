import { AnimatePresence, motion } from 'motion/react';
import { Translate } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import logoImg from '../assets/images/logo.webp';
import BackToTop from './BackToTop';
import SiteFooter from './SiteFooter';

const navItems = [
  { id: 'features', key: 'features' as const },
  { id: 'indicators', key: 'analysis' as const },
  { id: 'species', key: 'species' as const },
  { id: 'how-it-works', key: 'howItWorks' as const },
  { id: 'faq', key: 'faq' as const },
];

function LenisScrollRestoration() {
  const lenis = useLenis();
  const isRestored = React.useRef(false);

  React.useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLenis((lenisInstance) => {
    if (isRestored.current) {
      sessionStorage.setItem('scrollPosition', lenisInstance.scroll.toString());
    }
  });

  React.useEffect(() => {
    if (lenis && !isRestored.current) {
      const saved = sessionStorage.getItem('scrollPosition');
      if (saved) {
        const y = parseInt(saved, 10);
        lenis.scrollTo(y, { immediate: true });
      }
      setTimeout(() => {
        isRestored.current = true;
      }, 600);
    }
  }, [lenis]);

  return null;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { language, toggleLanguage, t } = useLanguage();
  const { startDownload } = useDownload();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0.1, 0.4] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (location.pathname === '/') {
      event.preventDefault();
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const links = navItems.map((item) => ({
    id: item.id,
    href: `/#${item.id}`,
    label: t.nav[item.key],
    current: location.pathname === '/' && activeId === item.id,
  }));

  return (
    <ReactLenis root>
      <LenisScrollRestoration />
      <div className="min-h-screen bg-white text-[#181818]">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:outline focus:outline-2 focus:outline-black"
        >
          {language === 'fil' ? 'Lumaktaw sa nilalaman' : 'Skip to content'}
        </a>

        <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
          <div className="pointer-events-auto flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-2 backdrop-blur-md">
            <Link to="/" className="flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-black" aria-current={location.pathname === '/' ? 'page' : undefined}>
              <img src={logoImg} alt="" className="h-8 w-8 object-contain" />
              <span className="title-3 hidden sm:inline">FISH2FRESH</span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.id)}
                  aria-current={link.current ? 'true' : undefined}
                  className={`caption-2 rounded-lg px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black ${link.current ? 'bg-[#F6F6F6] text-black' : 'text-slate-600 hover:bg-[#F6F6F6]'}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={toggleLanguage}
              className="btn inline-flex caption-4 text-slate-700 hover:bg-[#F6F6F6]"
              aria-label={language === 'en' ? 'Switch to Filipino' : 'Switch to English'}
            >
              <Translate size={16} />
              {language === 'en' ? 'EN' : 'FIL'}
            </button>

            <button type="button" onClick={startDownload} className="btn button-md btn-primary hidden sm:inline-flex">
              {t.nav.getApp}
            </button>

            <button
              type="button"
              className="relative h-8 w-8 rounded-lg lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                className="absolute left-2 top-2.5 h-0.5 w-4 bg-black"
                animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute left-2 top-[15px] h-0.5 w-4 bg-black"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute left-2 top-5 h-0.5 w-4 bg-black"
                animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          </div>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className="flex h-full flex-col justify-center gap-2 px-8" aria-label="Mobile">
                {links.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.id)}
                    aria-current={link.current ? 'true' : undefined}
                    className="heading-3 rounded-lg py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    startDownload();
                  }}
                  className="btn button-md btn-primary mt-6 inline-flex w-fit"
                >
                  {t.nav.getApp}
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="content" className="pt-24">
          {children}
        </main>

        <SiteFooter links={links} onNavigate={handleNavClick} />
        <BackToTop />
      </div>
    </ReactLenis>
  );
}
