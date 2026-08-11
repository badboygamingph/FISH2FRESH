import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function TermsOfService() {
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
              {language === 'en' ? 'Terms of Service' : 'Mga Tuntunin ng Serbisyo'}
            </span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">
            {language === 'en' ? 'Terms of Service' : 'Mga Tuntunin ng Serbisyo'}
          </h1>
          
          <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <p className="font-medium text-slate-500">
              {language === 'en' 
                ? 'Last updated: August 2026' 
                : 'Huling na-update: Agosto 2026'}
            </p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                {language === 'en' ? '1. Acceptance of Terms' : '1. Pagtanggap sa mga Tuntunin'}
              </h2>
              <p>
                {language === 'en'
                  ? 'By downloading or using FISH2FRESH, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not use our application.'
                  : 'Sa pamamagitan ng pag-download o paggamit ng FISH2FRESH, sumasang-ayon kang mapailalim sa mga Tuntunin ng Serbisyo na ito. Kung hindi ka sumasang-ayon sa anumang bahagi ng mga tuntunin, hindi mo maaaring gamitin ang aming application.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                {language === 'en' ? '2. Disclaimer of Accuracy' : '2. Pagtatatwa sa Katumpakan'}
              </h2>
              <p>
                {language === 'en'
                  ? 'The AI freshness classification is provided for informational purposes only. While our model is highly trained, we do not guarantee 100% accuracy. The app should not replace human judgment, especially regarding food safety.'
                  : 'Ang AI freshness classification ay ibinibigay lamang para sa mga layuning nagbibigay-impormasyon. Kahit na ang aming model ay lubos na sinanay, hindi namin ginagarantiyahan ang 100% katumpakan. Hindi dapat palitan ng app ang pagpapasya ng tao, lalo na tungkol sa kaligtasan ng pagkain.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                {language === 'en' ? '3. Permitted Use' : '3. Pinahihintulutang Paggamit'}
              </h2>
              <p>
                {language === 'en'
                  ? 'You are granted a non-exclusive, non-transferable license to use the app for personal, non-commercial purposes in accordance with these terms.'
                  : 'Binibigyan ka ng hindi eksklusibo, hindi maililipat na lisensya upang gamitin ang app para sa personal, hindi pang-komersyal na mga layunin alinsunod sa mga tuntuning ito.'}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
