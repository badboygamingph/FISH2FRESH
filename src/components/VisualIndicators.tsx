import { CaretLeft, CaretRight, Eye, Fish, Hand, Waves } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useRef, useState, type PointerEvent } from 'react';
import bulletImg from '../assets/images/bullet_tuna.jpg';
import skipjackImg from '../assets/images/skipjack_tuna_1786286515562.webp';
import yellowfinImg from '../assets/images/yellowfin_tuna.jpg';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';

export default function VisualIndicators() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const startX = useRef<number | null>(null);

  const markers = [
    { icon: Eye, title: t.indicators.i1_title, description: t.indicators.i1_desc },
    { icon: Waves, title: t.indicators.i2_title, description: t.indicators.i2_desc },
    { icon: Fish, title: t.indicators.i3_title, description: t.indicators.i3_desc },
    { icon: Hand, title: t.indicators.i4_title, description: t.indicators.i4_desc },
  ];

  const fish = [
    { src: bulletImg, name: t.species.sp1_name, local: t.species.sp1_local },
    { src: skipjackImg, name: t.species.sp2_name, local: t.species.sp2_local },
    { src: yellowfinImg, name: t.species.sp3_name, local: t.species.sp3_local },
  ];
  const current = fish[index];

  function step(delta: number) {
    setDirection(delta);
    setIndex((value) => (value + delta + fish.length) % fish.length);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('button')) return;
    startX.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (startX.current == null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (delta <= -48) step(1);
    else if (delta >= 48) step(-1);
  }

  return (
    <section id="indicators" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
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

        <Reveal>
          <div className="surface-card overflow-hidden">
            <div
              className="relative h-80 touch-pan-y overflow-hidden bg-[#F6F6F6]"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                startX.current = null;
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={current.name}
                  src={current.src}
                  alt={`${current.name} (${current.local})`}
                  className="absolute inset-0 h-full w-full object-contain"
                  initial={reduce ? false : { opacity: 0, x: direction * 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: direction * -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <button
                type="button"
                aria-label={t.indicators.previous}
                onClick={() => step(-1)}
                className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#181818] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#F6F6F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.98] lg:top-1/2 lg:-translate-y-1/2"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <button
                type="button"
                aria-label={t.indicators.next}
                onClick={() => step(1)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#181818] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#F6F6F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.98] lg:top-1/2 lg:-translate-y-1/2"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>
            <p className="caption-2 px-4 py-3 text-slate-600" aria-live="polite">
              {current.name} · {current.local}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
