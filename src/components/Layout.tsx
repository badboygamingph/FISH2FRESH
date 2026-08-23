import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Languages, Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import logoImg from '../assets/images/logo.webp';
import BackToTop from './BackToTop';

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
        setTimeout(() => lenis.scrollTo(y, { immediate: true }), 100);
        setTimeout(() => lenis.scrollTo(y, { immediate: true }), 500);
      }
      // Delay setting isRestored so we don't overwrite the saved value during the initial layout shifts
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
  const location = useLocation();
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ReactLenis root>
      <LenisScrollRestoration />
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 origin-left z-[100]"
        style={{ scaleX }}
      />
      {/* Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-blue-600 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg">
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img src={logoImg} alt="FISH2FRESH Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900">FISH<span className="text-slate-400 font-light">2</span>FRESH</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 font-medium text-slate-700 text-sm tracking-wide" aria-label="Desktop navigation">
            <a href="/#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.features}</a>
            <a href="/#indicators" onClick={(e) => handleNavClick(e, 'indicators')} className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.analysis}</a>
            <a href="/#species" onClick={(e) => handleNavClick(e, 'species')} className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.species}</a>
            <a href="/#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.howItWorks}</a>
            <a href="/#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.faq}</a>
          </nav>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label={language === 'en' ? "Switch to Filipino" : "Switch to English"}
            >
              <Languages size={18} />
              <span className="text-sm font-semibold uppercase">{language}</span>
            </button>
            <button onClick={startDownload} className="hidden sm:block bg-slate-900 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 transition-all duration-300 active:scale-95 text-xs md:text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2" aria-label={t.nav.getApp}>
              {t.nav.getApp}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <nav className="flex flex-col px-6 py-4 gap-4 font-medium text-slate-700" aria-label="Mobile navigation">
                <a href="/#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.features}</a>
                <a href="/#indicators" onClick={(e) => handleNavClick(e, 'indicators')} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.analysis}</a>
                <a href="/#species" onClick={(e) => handleNavClick(e, 'species')} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.species}</a>
                <a href="/#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.howItWorks}</a>
                <a href="/#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.faq}</a>
                <button onClick={() => { setIsMobileMenuOpen(false); startDownload(); }} className="sm:hidden w-full bg-slate-900 text-white px-6 py-3 rounded-full font-semibold mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2" aria-label={t.nav.getApp}>
                  {t.nav.getApp}
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-20 md:pt-24">
        {children}
      </main>

      <footer className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12" style={{ backgroundColor: '#100e0b' }}>
        {/* Carbon Glass Aura Gradient Layers */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Layer 1 - normal */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: "-50%",
              background: "linear-gradient(145deg, rgba(9,9,11,0.98) 0%, rgba(39,39,42,0.72) 48%, rgba(24,24,27,0.88) 100%)",
              backgroundSize: "200% 200%",
              mixBlendMode: "normal",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
          {/* Layer 2 - screen */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1.05, 1],
              x: ["0%", "3%", "-3%", "0%"],
              y: ["0%", "-3%", "3%", "0%"]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-50%",
              background: "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.07) 43%, rgba(161,161,170,0.12) 50%, transparent 67%)",
              mixBlendMode: "screen",
              filter: "blur(79px)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
          {/* Layer 3 - screen */}
          <motion.div
            animate={{
              x: ["0%", "-4%", "4%", "0%"],
              y: ["0%", "4%", "-4%", "0%"],
              scale: [1, 1.15, 0.95, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: "-50%",
              background: "radial-gradient(ellipse 42% 35% at 70% 30%, rgba(212,212,216,0.14) 0%, transparent 68%)",
              mixBlendMode: "screen",
              filter: "blur(162px)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 space-y-6"
            >
              <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg w-fit">
                <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <img src={logoImg} alt="FISH2FRESH Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">FISH<span className="text-slate-400 font-light">2</span>FRESH</span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-300 max-w-sm">
                {t.footer.desc}
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="GitHub" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-900/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-900/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">{t.footer.product}</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li><a href="/#features" onClick={(e) => handleNavClick(e, 'features')} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">{t.nav.features}</a></li>
                <li><a href="/#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">{t.nav.howItWorks}</a></li>
                <li><a href="/#species" onClick={(e) => handleNavClick(e, 'species')} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">{t.nav.species}</a></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">{t.footer.legal}</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li><Link to="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">{t.footer.privacy}</Link></li>
                <li><Link to="/terms" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">{t.footer.terms}</Link></li>
              </ul>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 pt-8 border-t border-white/10 flex justify-center md:justify-start items-center"
          >
            <p className="text-sm text-slate-400 font-medium text-center md:text-left">
              &copy; {new Date().getFullYear()} FISH2FRESH. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
      <BackToTop />
    </div>
    </ReactLenis>
  );
}
