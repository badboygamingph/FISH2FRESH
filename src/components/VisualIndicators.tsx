import { Eye, Fish, Hand, Waves } from '@phosphor-icons/react';
import { useReducedMotion } from 'motion/react';
import bulletImg from '../assets/images/bullet_tuna.jpg';
import skipjackImg from '../assets/images/skipjack_tuna_1786286515562.webp';
import yellowfinImg from '../assets/images/yellowfin_tuna.jpg';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';
import { ParallaxCarousel } from './ui/parallax-carousel';

export default function VisualIndicators() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const markers = [
    { icon: Eye,   title: t.indicators.i1_title, description: t.indicators.i1_desc },
    { icon: Waves, title: t.indicators.i2_title, description: t.indicators.i2_desc },
    { icon: Fish,  title: t.indicators.i3_title, description: t.indicators.i3_desc },
    { icon: Hand,  title: t.indicators.i4_title, description: t.indicators.i4_desc },
  ];

  const fish = [
    { src: bulletImg,    name: t.species.sp1_name, local: t.species.sp1_local },
    { src: skipjackImg,  name: t.species.sp2_name, local: t.species.sp2_local },
    { src: yellowfinImg, name: t.species.sp3_name, local: t.species.sp3_local },
  ];

  const carouselItems = fish.map((f) => ({
    src: f.src,
    title: f.name,
    subtitle: f.local,
  }));

  return (
    <section id="indicators" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* ── Left column: text + markers ── */}
        <Reveal>
          <h2 className="heading-2 max-w-[680px]">
            {t.indicators.title} {t.indicators.titleHighlight}
          </h2>
          <p className="body-3 mt-4 max-w-[680px] text-slate-600">{t.indicators.desc}</p>
          <ul className="mt-8 space-y-6">
            {markers.map((marker) => {
              const Icon = marker.icon;
              return (
                <li key={marker.title} className="flex gap-4">
                  <Icon size={22} className="mt-1 shrink-0" />
                  <div>
                    <h3 className="title-3">{marker.title}</h3>
                    <p className="body-6 mt-1 text-slate-600">{marker.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* ── Right column: Parallax Carousel ── */}
        <Reveal>
          <div className="surface-card overflow-hidden">
            <ParallaxCarousel
              items={carouselItems}
              imageWidth={300}
              imageHeight={240}
              gap={16}
              parallaxIntensity={reduce ? 0 : 0.45}
              uvScale={0.85}
              lerp={reduce ? 1 : 0.08}
              autoplaySpeed={reduce ? 0 : 28}
              loop={true}
              borderRadius={12}
              showProgress={false}
              pauseOnHover={true}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
