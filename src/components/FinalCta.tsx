import React from 'react';
import { ArrowDown, ShieldCheck, WifiSlash } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';
import Reveal from './Reveal';

export default function FinalCta() {
  const { language } = useLanguage();
  const { startDownload } = useDownload();

  const title =
    language === 'fil'
      ? 'Dalhin ang FISH2FRESH sa palengke.'
      : 'Take FISH2FRESH to the market.';

  const desc =
    language === 'fil'
      ? 'Suriin agad ang pagkasariwa ng Pirit (Bullet Tuna), Tulingan (Skipjack), at Karaw (Yellowfin) gamit ang camera ng iyong telepono. Walang internet o account na kailangan.'
      : 'Instantly verify the freshness of Bullet Tuna, Skipjack Tuna, and Yellowfin Tuna right from your phone camera. No internet or account needed.';

  const downloadBtn =
    language === 'fil' ? 'I-download ang App (Android)' : 'Download App (Android)';

  const trustBadges =
    language === 'fil'
      ? ['100% Libre', 'Walang Rehistro', 'Walang Internet']
      : ['100% Free', 'No Account Required', 'No Internet Needed'];

  return (
    <section id="download" className="bg-[#181818] py-20 text-white md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="heading-2 text-white text-balance">{title}</h2>

          <p className="body-3 mt-4 text-white/80 max-w-[640px] mx-auto text-pretty">
            {desc}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={startDownload}
              className="btn button-md btn-inverse inline-flex px-6 py-3 font-semibold shadow-lg"
            >
              <ArrowDown size={18} weight="bold" />
              {downloadBtn}
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} weight="bold" className="text-white/80" />
              <span className="caption-2">{trustBadges[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <WifiSlash size={18} weight="bold" className="text-white/80" />
              <span className="caption-2">{trustBadges[2]}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="caption-2">{trustBadges[1]}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
