import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Languages, Menu, X, Github, Linkedin } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import logoImg from '../assets/images/logo.webp';

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

      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg w-fit">
                <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <img src={logoImg} alt="FISH2FRESH Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-slate-900">FISH<span className="text-slate-400 font-light">2</span>FRESH</span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-600 max-w-sm">
                {t.footer.desc}
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="GitHub" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-400 hover:border-blue-200 hover:bg-blue-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Links Section */}
            <div>
              <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase">{t.footer.product}</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li><a href="/#features" onClick={(e) => handleNavClick(e, 'features')} className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium">{t.nav.features}</a></li>
                <li><a href="/#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium">{t.nav.howItWorks}</a></li>
                <li><a href="/#species" onClick={(e) => handleNavClick(e, 'species')} className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium">{t.nav.species}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase">{t.footer.legal}</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li><Link to="/privacy" className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium">{t.footer.privacy}</Link></li>
                <li><Link to="/terms" className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium">{t.footer.terms}</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} FISH2FRESH. All rights reserved.
            </p>
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
               <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-slate-600 font-semibold tracking-wide text-xs uppercase">{t.footer.offline}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </ReactLenis>
  );
}
