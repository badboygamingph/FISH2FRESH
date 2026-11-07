import { CheckCircle, Warning, XCircle } from '@phosphor-icons/react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

type Step = {
  label: string;
  title: string;
  description: string;
};

function StepTimeline({ steps, active }: { steps: Step[]; active: number }) {
  return (
    <ol className="mx-auto max-w-xl text-left">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        const isActive = index === active;
        const quiet = active >= 0 && !isActive;
        return (
          <li key={step.label} data-active={isActive ? 'true' : 'false'} className={`relative pl-10 ${last ? '' : 'pb-10'}`}>
            {!last && (
              <span className="absolute bottom-0 left-2 top-2 w-px -translate-x-1/2 bg-[#E4E4E4]" aria-hidden="true" />
            )}
            <motion.span
              aria-hidden="true"
              className="absolute left-2 top-1 h-4 w-4 -translate-x-1/2 rounded-full"
              animate={{
                scale: isActive ? 1 : 0.8,
                backgroundColor: isActive ? '#2563EB' : '#C5C5C5',
              }}
              transition={{ duration: 0.5, ease: EASE }}
            />
            <motion.div
              animate={{ opacity: quiet ? 0.38 : 1, y: quiet ? 6 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="caption-4 text-slate-500">{step.label}</p>
              <h3 className="title-1 mt-2 text-[#181818]" aria-current={isActive ? 'step' : undefined}>
                {step.title}
              </h3>
              <p className="body-6 mt-2 text-pretty text-slate-600">{step.description}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}

export default function HowItWorks() {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const stepWord = language === 'fil' ? 'Hakbang' : 'Step';

  const steps: Step[] = [
    { title: t.howItWorks.s1_title, description: t.howItWorks.s1_desc },
    { title: t.howItWorks.s2_title, description: t.howItWorks.s2_desc },
    { title: t.howItWorks.s3_title, description: t.howItWorks.s3_desc },
  ].map((step, index) => ({
    ...step,
    label: `${stepWord} 0${index + 1}`,
    title: step.title.replace(/^\d+\.\s*/, ''),
  }));

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (reduce) return;
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActive((current) => (current === next ? current : next));
  });

  const classes = [
    { icon: CheckCircle, title: t.howItWorks.c1_title, description: t.howItWorks.c1_desc },
    { icon: Warning, title: t.howItWorks.c2_title, description: t.howItWorks.c2_desc },
    { icon: XCircle, title: t.howItWorks.c3_title, description: t.howItWorks.c3_desc },
  ];

  const stepsView = (
    <div className="mx-auto w-full max-w-3xl px-6 text-center">
      <h2 className="heading-2">{t.howItWorks.title}</h2>
      <p className="body-3 mx-auto mt-4 max-w-[680px] text-pretty text-slate-600">{t.howItWorks.desc}</p>
      <div className="mt-12">
        <StepTimeline steps={steps} active={reduce ? -1 : active} />
      </div>
    </div>
  );

  return (
    <section id="how-it-works" className="bg-white">
      {reduce ? (
        <div className="py-16 md:py-24">{stepsView}</div>
      ) : (
        <div ref={trackRef} className="relative h-[260vh]">
          <div className="sticky top-24 flex h-[calc(100svh-6rem)] items-center">{stepsView}</div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <Reveal>
          <h3 className="heading-3">{t.howItWorks.classTitle}</h3>
        </Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {classes.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg bg-[#F6F6F6] p-6">
                <Icon size={22} />
                <h4 className="title-3 mt-4">{item.title}</h4>
                <p className="body-6 mt-2 text-pretty text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
