import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Fish, Languages, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { language, toggleLanguage, t } = useLanguage();
  const { startDownload } = useDownload();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Fish size={20} strokeWidth={2.5} className="md:w-[22px] md:h-[22px]" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900">FISH<span className="text-slate-400 font-light">2</span>FRESH</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 font-medium text-slate-700 text-sm tracking-wide" aria-label="Desktop navigation">
            <a href="/#features" className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.features}</a>
            <a href="/#indicators" className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.analysis}</a>
            <a href="/#species" className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.species}</a>
            <a href="/#how-it-works" className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.howItWorks}</a>
            <a href="/#faq" className="hover:text-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.faq}</a>
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
                <a href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.features}</a>
                <a href="/#indicators" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.analysis}</a>
                <a href="/#species" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.species}</a>
                <a href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.howItWorks}</a>
                <a href="/#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-950 transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm">{t.nav.faq}</a>
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

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 text-white mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg inline-flex">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400">
                <Fish size={18} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">FISH<span className="text-slate-500 font-light">2</span>FRESH</span>
            </Link>
            <p className="max-w-sm leading-relaxed text-slate-400">
              {t.footer.desc}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">{t.footer.product}</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-300">
              <li><a href="/#features" className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm">{t.nav.features}</a></li>
              <li><a href="/#how-it-works" className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm">{t.nav.howItWorks}</a></li>
              <li><a href="/#species" className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm">{t.nav.species}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">{t.footer.legal}</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-300">
              <li><Link to="/privacy" className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm">{t.footer.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-sm">{t.footer.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800/50 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
          <p>&copy; {new Date().getFullYear()} FISH2FRESH. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {t.footer.offline}
          </p>
        </div>
      </footer>
    </div>
    </ReactLenis>
  );
}
