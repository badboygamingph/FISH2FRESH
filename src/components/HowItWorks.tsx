import { Camera, CheckCircle, Scan, Warning, XCircle } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { icon: Camera, title: t.howItWorks.s1_title, description: t.howItWorks.s1_desc },
    { icon: Scan, title: t.howItWorks.s2_title, description: t.howItWorks.s2_desc },
    { icon: CheckCircle, title: t.howItWorks.s3_title, description: t.howItWorks.s3_desc },
  ];

  const classes = [
    { icon: CheckCircle, title: t.howItWorks.c1_title, description: t.howItWorks.c1_desc },
    { icon: Warning, title: t.howItWorks.c2_title, description: t.howItWorks.c2_desc },
    { icon: XCircle, title: t.howItWorks.c3_title, description: t.howItWorks.c3_desc },
  ];

  return (
    <section id="how-it-works" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="heading-2 max-w-[680px]">{t.howItWorks.title}</h2>
          <p className="body-3 mt-4 max-w-[680px] text-slate-600">{t.howItWorks.desc}</p>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 0.06}>
                <li className="surface-card h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="caption-4 flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6F6F6]">
                      0{index + 1}
                    </span>
                    <Icon size={22} />
                  </div>
                  <h3 className="title-2 mt-6">{step.title.replace(/^\d+\.\s*/, '')}</h3>
                  <p className="body-6 mt-3 text-slate-600">{step.description}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-12">
          <h3 className="heading-3">{t.howItWorks.classTitle}</h3>
        </Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {classes.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg bg-[#F6F6F6] p-6">
                <Icon size={22} />
                <h4 className="title-3 mt-4">{item.title}</h4>
                <p className="body-6 mt-2 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
