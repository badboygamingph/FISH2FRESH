import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';
import Reveal from './Reveal';

export default function FinalCta() {
  const { language, t } = useLanguage();
  const { startDownload } = useDownload();

  const title = language === 'fil'
    ? 'Dalhin ang FISH2FRESH sa palengke.'
    : 'Take FISH2FRESH to the market.';
  const desc = language === 'fil'
    ? 'Tumatakbo ang pagsusuri sa telepono mo. Walang account at walang internet.'
    : 'The check runs on your phone. No account and no internet.';

  return (
    <section className="bg-[#181818] py-16 text-white md:py-24">
      <div className="mx-auto max-w-[680px] px-6">
        <Reveal>
          <h2 className="heading-2">{title}</h2>
          <p className="body-3 mt-4 text-white/80">{desc}</p>
          <button type="button" onClick={startDownload} className="btn button-md btn-inverse mt-8 inline-flex">
            {t.hero.download}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
