import { Cpu, ShieldCheck, WifiSlash } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    { icon: WifiSlash, title: t.features.f1_title, description: t.features.f1_desc },
    { icon: Cpu, title: t.features.f2_title, description: t.features.f2_desc },
    { icon: ShieldCheck, title: t.features.f3_title, description: t.features.f3_desc },
  ];

  return (
    <section id="features" className="bg-[#F6F6F6] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="heading-2 max-w-[680px]">{t.features.title}</h2>
          <p className="body-3 mt-4 max-w-[680px] text-slate-600">{t.features.desc}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={index * 0.06}>
                <article className="surface-card h-full p-6">
                  <Icon size={24} />
                  <h3 className="title-2 mt-6">{feature.title}</h3>
                  <p className="body-6 mt-3 text-slate-600">{feature.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
