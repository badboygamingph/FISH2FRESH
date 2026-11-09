import { Accordion } from '@animate-ui/react/primitives/base-ui/accordion';
import { CaretDown } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';

export default function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
  ];

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="heading-2">{t.faq.title}</h2>
          <p className="body-3 mt-4 text-slate-600">{t.faq.desc}</p>
        </Reveal>
        <Accordion.Root defaultValue={['item-0']} className="mt-8 divide-y divide-black/10 border-y border-black/10">
          {faqs.map((item, index) => (
            <Accordion.Item key={index} value={`item-${index}`} className="group">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer">
                  <span className="title-3">{item.question}</span>
                  <CaretDown
                    size={18}
                    className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[panel-open]:rotate-180 group-aria-expanded:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="body-6 pb-4 text-slate-600">
                {item.answer}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
