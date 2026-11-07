import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppStoreButton, GalaxyStoreButton, GooglePlayButton } from './base/buttons/app-store-buttons';
import BlurText from './BlurText';
import GradientASCII from './GradientASCII';

export default function Hero() {
  const { t } = useLanguage();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  const scanScenarios = [
    {
      target: t.hero.scanSkipjack,
      status: t.hero.fresh,
      icon: CheckCircle2,
      badgeBg: 'bg-emerald-50',
      badgeBorder: 'border-emerald-200',
      badgeText: 'text-emerald-700',
      badgeIconText: 'text-emerald-500',
      badgeLabelText: 'text-emerald-600',
    },
    {
      target: t.hero.scanBullet,
      status: t.hero.fairlyFresh,
      icon: AlertTriangle,
      badgeBg: 'bg-amber-50',
      badgeBorder: 'border-amber-200',
      badgeText: 'text-amber-700',
      badgeIconText: 'text-amber-500',
      badgeLabelText: 'text-amber-600',
    },
    {
      target: t.hero.scanYellowfin,
      status: t.hero.spoiled,
      icon: XCircle,
      badgeBg: 'bg-rose-50',
      badgeBorder: 'border-rose-200',
      badgeText: 'text-rose-700',
      badgeIconText: 'text-rose-500',
      badgeLabelText: 'text-rose-600',
    },
  ];

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % scanScenarios.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reduce, scanScenarios.length]);

  const scenario = scanScenarios[scenarioIndex];
  const StatusIcon = scenario.icon;

  return (
    <section ref={heroRef} className="relative -mt-24 overflow-hidden bg-[#f6f8ff] pb-16 pt-24 sm:pb-24 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <GradientASCII
          colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
          clickEffect="none"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative z-20 w-full max-w-xl text-left">
            <motion.div
              style={reduce ? undefined : { y: textY, opacity: textOpacity }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="mb-6 max-w-[42.5rem] text-balance text-4xl font-bold tracking-tight text-[#181818] sm:text-5xl lg:mb-8 lg:text-6xl">
                <span className="block">
                  <BlurText text={t.hero.title1} delay={100} initialDelay={0.2} as="span" className="text-[#181818]" />
                </span>
                <span className="mt-1 block text-[#0b2f9e]">
                  <BlurText text={t.hero.title2} delay={100} initialDelay={0.2 + t.hero.title1.split(' ').length * 0.1} as="span" className="text-[#0b2f9e]" />
                </span>
                <span className="mt-1 block">
                  <BlurText text={t.hero.title3} delay={100} initialDelay={0.2 + (t.hero.title1.split(' ').length + t.hero.title2.split(' ').length) * 0.1} as="span" className="text-[#181818]" />
                </span>
              </h1>
              <div className="mb-8 max-w-[42.5rem] text-pretty text-base font-medium leading-6 text-[#272727] sm:text-lg sm:leading-7 lg:mb-10">
                <BlurText text={t.hero.desc1} delay={30} initialDelay={0.8} as="span" className="text-[#272727]" />
                {' '}
                <BlurText text={t.hero.desc2} delay={30} initialDelay={0.8 + t.hero.desc1.split(' ').length * 0.03} as="span" className="font-semibold text-[#181818]" />
              </div>

              <div className="flex max-w-[17.5rem] flex-wrap items-center gap-3">
                <GooglePlayButton />
                <AppStoreButton />
                <GalaxyStoreButton />
              </div>
            </motion.div>
          </div>

          <motion.div
            style={reduce ? undefined : { y: phoneY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mt-2 flex justify-center lg:ml-auto lg:mt-0"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-60" style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)' }} />

            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 aspect-[280/580] w-[min(280px,calc(100vw-3rem))] rounded-[2.4rem] border border-slate-700/50 bg-slate-900 p-2.5 shadow-[0_20px_50px_rgba(37,99,235,0.2)] sm:rounded-[3rem] sm:p-3"
            >
              <div className="absolute inset-x-0 top-2.5 z-20 mx-auto h-5 w-24 rounded-b-2xl bg-slate-900 sm:top-3 sm:h-6 sm:w-32" />
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.8rem] bg-slate-50 sm:rounded-[2.25rem]">
                <div className="relative h-3/5 overflow-hidden bg-slate-200">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  <div className="absolute inset-6 flex items-center justify-center rounded-xl border-2 border-dashed border-blue-500 sm:inset-8">
                    <div className="absolute top-1/2 h-1 w-14 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] sm:w-16" />
                  </div>
                </div>
                <div className="relative -mt-5 flex flex-1 flex-col justify-end rounded-t-3xl bg-white p-4 pb-6 sm:p-6 sm:pb-8">
                  <div className="flex min-h-[7.5rem] flex-col justify-end sm:min-h-[8.5rem]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={scenarioIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex w-full flex-col gap-3 sm:gap-4"
                      >
                        <div className="text-center">
                          <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:text-sm">{t.hero.target}</p>
                          <p className="text-lg font-bold text-slate-900 sm:text-xl">{scenario.target}</p>
                        </div>
                        <div className={`${scenario.badgeBg} ${scenario.badgeText} flex items-center justify-center gap-3 rounded-2xl border ${scenario.badgeBorder} p-3 shadow-sm sm:p-4`}>
                          <StatusIcon className={scenario.badgeIconText} size={24} />
                          <div>
                            <p className={`mb-1 text-[10px] font-semibold uppercase tracking-wider sm:text-xs ${scenario.badgeLabelText}`}>{t.hero.classification}</p>
                            <p className="text-xl font-bold leading-none sm:text-2xl">{scenario.status}</p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
