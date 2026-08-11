import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  
  return (
    <div className="py-20 md:py-32 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-slate-500 mb-8 mt-4">
            <Link to="/" className="flex items-center hover:text-blue-600 transition-colors">
              <Home size={16} className="mr-1" />
              {language === 'en' ? 'Home' : 'Home'}
            </Link>
            <ChevronRight size={16} className="mx-2 text-slate-400" />
            <span className="text-slate-900 font-medium">
              {language === 'en' ? 'Privacy Policy' : 'Patakaran sa Privacy'}
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">
            {language === 'en' ? 'Privacy Policy' : 'Patakaran sa Privacy'}
          </h1>
          
          <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <p className="font-medium text-slate-500">
              {language === 'en' 
                ? 'Last updated: August 2026' 
                : 'Huling na-update: Agosto 2026'}
            </p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                {language === 'en' ? '1. Information We Do Not Collect' : '1. Impormasyong Hindi Namin Kinokolekta'}
              </h2>
              <p>
                {language === 'en'
                  ? 'FISH2FRESH is designed as an offline-first application. We respect your privacy. The app runs completely locally on your device. We do not collect, store, or transmit your personal data, photos, or location to any external servers.'
                  : 'Ang FISH2FRESH ay dinisenyo bilang isang offline-first na application. Iginagalang namin ang iyong privacy. Ang app ay tumatakbo nang lokal sa iyong device. Hindi kami nangongolekta, nag-iimbak, o nagpapadala ng iyong personal na data, mga larawan, o lokasyon sa anumang mga panlabas na server.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                {language === 'en' ? '2. Camera Permissions' : '2. Mga Pahintulot sa Camera'}
              </h2>
              <p>
                {language === 'en'
                  ? 'The app requires camera access solely to process images of fish in real-time through our on-device AI model. No photos are saved to your gallery without your explicit action, and no images are uploaded to the internet.'
                  : 'Nangangailangan ang app ng access sa camera para lamang maproseso ang mga larawan ng isda sa real-time sa pamamagitan ng aming on-device AI model. Walang mga larawang nase-save sa iyong gallery nang walang pormal na aksyon mula sa iyo, at walang mga larawang na-upload sa internet.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                {language === 'en' ? '3. Changes to This Policy' : '3. Mga Pagbabago sa Patakarang Ito'}
              </h2>
              <p>
                {language === 'en'
                  ? 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.'
                  : 'Maaari naming i-update ang aming Patakaran sa Privacy paminsan-minsan. Aabisuhan ka namin tungkol sa anumang mga pagbabago sa pamamagitan ng pag-post ng bagong Patakaran sa Privacy sa pahinang ito.'}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
