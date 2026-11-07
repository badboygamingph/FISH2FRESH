import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';
import bulletImg from '../assets/images/bullet_tuna.jpg';
import skipjackImg from '../assets/images/skipjack_tuna_1786286515562.webp';
import yellowfinImg from '../assets/images/yellowfin_tuna.jpg';

export default function Species() {
  const { t } = useLanguage();

  const speciesList = [
    {
      id: 'bullet-tuna',
      name: t.species.sp1_name,
      localName: t.species.sp1_local,
      description: t.species.sp1_desc,
      image: bulletImg,
      traits: [t.species.sp1_t1, t.species.sp1_t2, t.species.sp1_t3],
    },
    {
      id: 'skipjack-tuna',
      name: t.species.sp2_name,
      localName: t.species.sp2_local,
      description: t.species.sp2_desc,
      image: skipjackImg,
      traits: [t.species.sp2_t1, t.species.sp2_t2, t.species.sp2_t3],
    },
    {
      id: 'yellowfin-tuna',
      name: t.species.sp3_name,
      localName: t.species.sp3_local,
      description: t.species.sp3_desc,
      image: yellowfinImg,
      traits: [t.species.sp3_t1, t.species.sp3_t2, t.species.sp3_t3],
    },
  ];

  return (
    <section id="species" className="bg-[#F6F6F6] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="heading-2 max-w-[680px]">{t.species.title}</h2>
          <p className="body-3 mt-4 max-w-[680px] text-slate-600">{t.species.desc}</p>
        </Reveal>

        <div className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 px-6 pb-2 [scrollbar-color:#181818_transparent] [scrollbar-width:thin] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:scroll-pl-0 lg:px-0 lg:pb-0">
          {speciesList.map((species) => (
            <article
              key={species.id}
              className="surface-card flex w-[min(20rem,calc(100vw-4.5rem))] shrink-0 snap-start flex-col overflow-hidden lg:w-auto lg:shrink"
            >
                <img
                  src={species.image}
                  alt={species.name}
                  className="h-48 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="caption-4 text-slate-500">{species.localName}</p>
                  <h3 className="title-2 mt-2">{species.name}</h3>
                  <p className="body-6 mt-3 text-slate-600">{species.description}</p>
                  <ul className="mt-4 space-y-2">
                    {species.traits.map((trait) => (
                      <li key={trait} className="body-6 text-slate-800">
                        {trait}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/species/${species.id}`}
                    className="btn button-md btn-primary mt-6 inline-flex w-fit"
                  >
                    {t.species.readMore}
                    <ArrowRight size={18} />
                  </Link>
                </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
