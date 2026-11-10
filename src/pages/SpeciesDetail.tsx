import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MapPin,
  Scales,
  Sparkle,
  Storefront,
  Tag,
} from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';
import Reveal from '../components/Reveal';
import { SITE_URL } from '../seo';
import bulletImg from '../assets/images/bullet_tuna.jpg';
import skipjackImg from '../assets/images/skipjack_tuna_1786286515562.webp';
import yellowfinImg from '../assets/images/yellowfin_tuna.jpg';

type SpeciesCopy = {
  name: string;
  localName: string;
  habitat: string;
  size: string;
  weight: string;
  market: string;
  description: string;
  freshnessMetrics: readonly string[];
};

const speciesData = {
  'bullet-tuna': {
    id: 'bullet-tuna',
    image: bulletImg,
    scientificName: 'Auxis rochei',
    en: {
      name: 'Bullet Tuna',
      localName: 'Pirit',
      habitat: 'Coastal waters and around islands, from near the surface to about 200 m.',
      size: 'Up to 50 cm fork length.',
      weight: 'Up to 1.84 kg.',
      market: 'Sold fresh or frozen in wet markets, and also dried, salted, smoked, or canned.',
      description:
        'Bullet tuna (Auxis rochei) is the small, torpedo-shaped tuna commonly known in Philippine markets as Pirit. Adults school abundantly in warm coastal waters and around island reefs. It is distinguished by 15 or more broad, nearly vertical dark bars across its scaleless upper flank, short pectoral fins, and a deep bluish back that transitions to brilliant white across the belly.',
      freshnessMetrics: [
        'Eyes are bright, clear, and bulging with a deep dark pupil.',
        'Gills are vivid red and completely free of sour slime or gray film.',
        'Flesh is firm and instantly springs back when gently pressed.',
        'Dark back bars remain sharp and well-defined with a clean, ocean-fresh aroma.',
      ],
    },
    fil: {
      name: 'Pirit',
      localName: 'Bullet Tuna',
      habitat: 'Baybayin at paligid ng mga isla, mula malapit sa ibabaw hanggang mga 200 m.',
      size: 'Hanggang 50 cm fork length.',
      weight: 'Hanggang 1.84 kg.',
      market: 'Ibinebenta nang sariwa o frozen sa palengke, at pinatutuyo, inaasinan, pinauusukan, o de-lata.',
      description:
        'Ang Bullet Tuna (Auxis rochei) ang tanyag na maliit na tuna na tinatawag na Pirit sa palengke. Namumundok ang mga ito sa mga baybayin at paligid ng mga isla. Makikilala ito sa 15 o higit pang malalapad at halos patayong maitim na guhit sa itaas na bahagi ng katawan, maikling palikpik sa dibdib, at matingkad na kulay asul sa likod.',
      freshnessMetrics: [
        'Maliwanag, malinaw, at matambok ang mata na may maitim na pupil.',
        'Matingkad na sariwang pula ang hasang at walang malapot na laway o putik.',
        'Matigas ang laman at agad bumabalik kapag marahang pinindot.',
        'Malinaw at buo pa ang maitim na guhit sa likod na may sariwang amoy-dagat.',
      ],
    },
  },
  'skipjack-tuna': {
    id: 'skipjack-tuna',
    image: skipjackImg,
    scientificName: 'Katsuwonus pelamis',
    en: {
      name: 'Skipjack Tuna',
      localName: 'Tulingan',
      habitat: 'Offshore tropical and warm temperate seas, from the surface to 260 m.',
      size: 'Up to 110 cm fork length. Common length about 80 cm.',
      weight: 'Up to 34.5 kg.',
      market: 'Sold fresh, frozen, or canned, and widely used for traditional sinina and sinaing.',
      description:
        'Skipjack tuna (Katsuwonus pelamis) is the renowned oceanic tuna sold across the Philippines as Tulingan. Recognizable by its metallic purplish-blue dorsal surface and 4 to 6 prominent longitudinal dark stripes along the lower silver flank. Fast-swimming and highly energetic, it represents one of the most vital catches in Philippine artisanal and commercial fisheries.',
      freshnessMetrics: [
        'Eyes remain bulging, transparent, and reflective.',
        'Gills are scarlet or deep blood red, never brownish, faded, or discolored.',
        'The 4 to 6 belly bands stay dark, sharp, and unbroken.',
        'Skin retains a distinct metallic sheen and the entire torso stays firm and taut.',
      ],
    },
    fil: {
      name: 'Tulingan',
      localName: 'Skipjack Tuna',
      habitat: 'Laot na tropikal at maligamgam, mula sa ibabaw hanggang 260 m.',
      size: 'Hanggang 110 cm fork length. Karaniwang mga 80 cm.',
      weight: 'Hanggang 34.5 kg.',
      market: 'Ibinebenta nang sariwa, frozen, o de-lata, at paborito sa sinaing at pagluluto sa palayok.',
      description:
        'Ang Skipjack Tuna (Katsuwonus pelamis) ang kilalang Tulingan sa ating mga palengke. Madilim na purplish-blue ang likod at pilak ang ibabang bahagi na may 4 hanggang 6 na malilinaw na pahabang maitim na guhit sa tiyan. Napakabilis lumangoy sa malalalim na dagat at isa sa pinakapangunahing isda sa hapag-kainang Pilipino.',
      freshnessMetrics: [
        'Matambok, malinaw, at walang pamumula ang mga mata.',
        'Iskarlata o matingkad na pulang-dugo ang hasang, hindi kayumanggi o abuhing maputla.',
        'Madilim at tuloy-tuloy pa ang 4 hanggang 6 na guhit sa tiyan nang walang pagkadurog.',
        'May likas na metalikong kintab ang balat at nananatiling matatag ang buong katawan.',
      ],
    },
  },
  'yellowfin-tuna': {
    id: 'yellowfin-tuna',
    image: yellowfinImg,
    scientificName: 'Thunnus albacares',
    en: {
      name: 'Yellowfin Tuna',
      localName: 'Karaw',
      habitat: 'Open tropical and subtropical oceans, usually from 1 m to 250 m depth.',
      size: 'Up to 239 cm fork length. Common length about 150 cm.',
      weight: 'Up to 200 kg.',
      market: 'Sold fresh, frozen, loin steaks, or sashimi-grade cuts at prime wet markets.',
      description:
        'Yellowfin tuna (Thunnus albacares) is the prized large pelagic tuna known locally as Karaw. Famous for its striking sickle-shaped bright yellow second dorsal and anal fins and brilliant golden-yellow finlets with delicate black borders. Its deep, dense crimson flesh is celebrated nationwide for exceptional culinary texture, freshness, and high market value.',
      freshnessMetrics: [
        'Eyes are clear, spherical, and bulging with no milky opacity.',
        'Gills exhibit a bright ruby red tone with no excess mucus or foul odor.',
        'Yellow fins and finlets stay radiant and vibrant, not dull, gray, or desiccated.',
        'Flesh is dense, translucent, and smells cleanly of pure sea breeze.',
      ],
    },
    fil: {
      name: 'Karaw',
      localName: 'Yellowfin Tuna',
      habitat: 'Bukas na tropikal at subtropikal na karagatan, karaniwan mula 1 m hanggang 250 m.',
      size: 'Hanggang 239 cm fork length. Karaniwang mga 150 cm.',
      weight: 'Hanggang 200 kg.',
      market: 'Ibinebenta nang sariwa, hiwang steak, sashimi-grade, o pinalalamig sa malalaking palengke.',
      description:
        'Ang Yellowfin Tuna (Thunnus albacares) ang malaki at mamahaling tuna sa laot na tinatawag na Karaw sa lokal na merkado. Kilalang-kilala sa mahahabang matingkad na dilaw na palikpik at maliliit na finlet na may manipis na linyang itim. Matingkad na pula at siksik ang laman nito na paborito sa sashimi at sariwang luto.',
      freshnessMetrics: [
        'Malinaw, bilog, at umbok ang mata na walang anumang labo.',
        'Matingkad na kulay rubi ang hasang at walang maruming mucus o maasim na amoy.',
        'Matingkad pa ang dilaw sa mga palikpik at finlet, hindi nanlalabo o nagkukulay abo.',
        'Siksik at matigas ang hiwa ng laman na may malinis na samyo ng dagat.',
      ],
    },
  },
} as const;

const speciesAliases: Record<string, keyof typeof speciesData> = {
  'frigate-tuna': 'bullet-tuna',
  'mackerel-tuna': 'yellowfin-tuna',
};

const allSpeciesKeys = ['bullet-tuna', 'skipjack-tuna', 'yellowfin-tuna'] as const;

export default function SpeciesDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { startDownload } = useDownload();

  const resolvedId = id ? (speciesAliases[id] ?? id) : '';
  const record = speciesData[resolvedId as keyof typeof speciesData];
  const copy: SpeciesCopy | undefined = record ? record[language] : undefined;

  const labels =
    language === 'fil'
      ? {
          back: 'Bumalik sa listahan ng isda',
          badge: 'Klasipikasyon ng Isda',
          aiSupported: '100% Suportado ng AI',
          habitat: 'Tirahan at Karagatan',
          sizeWeight: 'Sukat at Timbang',
          sizeLabel: 'Karaniwang haba',
          weightLabel: 'Timbang',
          market: 'Sa Palengke',
          profileTitle: 'Mga Biyolohikal na Katangian',
          profileDesc: 'Ang mga katangian, likas na tirahan, at halaga sa merkado ng isdang ito sa Pilipinas.',
          freshness: 'Paano Tingnan ang Pagkasariwa',
          freshnessIntro: 'Bago gamitin ang FISH2FRESH scanner, suriin ang',
          freshnessOutro: 'gamit ang mga visual na palatandaang ito.',
          otherSpecies: 'Iba Pang Sinusuportahang Isda',
          otherSpeciesDesc: 'Tingnan ang iba pang mga uri ng tuna na kayang suriin ng FISH2FRESH AI model.',
          viewDetails: 'Basahin ang buong detalye',
          ctaTitle: `Dalhin ang FISH2FRESH sa palengke.`,
          ctaDesc: `Suriin agad ang pagkasariwa ng ${copy?.name ?? 'isda'} gamit ang camera ng iyong telepono. Walang internet na kailangan.`,
          downloadBtn: 'I-download ang App (Android)',
          missingTitle: 'Hindi nahanap ang isda',
          missingBody: 'Wala sa talaan ang isdang hinahanap mo.',
          home: 'Bumalik sa Home',
        }
      : {
          back: 'Back to species list',
          badge: 'Species Classification',
          aiSupported: '100% On-Device AI Supported',
          habitat: 'Habitat & Marine Range',
          sizeWeight: 'Size & Weight Profile',
          sizeLabel: 'Typical length',
          weightLabel: 'Max recorded weight',
          market: 'Market & Culinary Use',
          profileTitle: 'Biological and Market Profile',
          profileDesc: 'Key morphological characteristics, habitat range, and commercial value across Philippine wet markets.',
          freshness: 'How to Check Freshness',
          freshnessIntro: 'Before scanning with FISH2FRESH, you can inspect the',
          freshnessOutro: 'with these key quality indicators.',
          otherSpecies: 'Other Supported Tuna Species',
          otherSpeciesDesc: 'Explore other species trained directly inside the FISH2FRESH on-device classification model.',
          viewDetails: 'Read full details',
          ctaTitle: `Take FISH2FRESH to the market.`,
          ctaDesc: `Instantly verify the freshness of ${copy?.name ?? 'tuna'} right from your phone camera. No internet or account needed.`,
          downloadBtn: 'Download App (Android)',
          missingTitle: 'Species not found',
          missingBody: 'That tuna species is not currently in the supported list.',
          home: 'Return home',
        };

  if (!record || !copy) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 py-24 text-center text-[#181818]">
        <Helmet>
          <title>{labels.missingTitle} | FISH2FRESH</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="heading-2">{labels.missingTitle}</h1>
        <p className="body-3 mt-4 max-w-md text-slate-600">{labels.missingBody}</p>
        <Link to="/" className="btn button-md btn-primary mt-8 inline-flex">
          <ArrowLeft size={18} weight="bold" />
          {labels.home}
        </Link>
      </div>
    );
  }

  const otherSpecies = allSpeciesKeys
    .filter((k) => k !== resolvedId)
    .map((k) => {
      const sp = speciesData[k];
      const spCopy = sp[language];
      return {
        id: sp.id,
        image: sp.image,
        name: spCopy.name,
        localName: spCopy.localName,
        scientificName: sp.scientificName,
        description: spCopy.description,
        traits: [spCopy.size, spCopy.weight],
      };
    });

  return (
    <div className="min-h-screen bg-white text-[#181818]">
      <Helmet>
        <title>{`${copy.name} (${copy.localName}) | FISH2FRESH`}</title>
        <meta name="description" content={copy.description} />
        <link rel="canonical" href={`${SITE_URL}/species/${resolvedId}`} />
        <meta property="og:title" content={`${copy.name} (${copy.localName}) | FISH2FRESH`} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:url" content={`${SITE_URL}/species/${resolvedId}`} />
      </Helmet>

      {/* ── Top Hero Section ── */}
      <section className="border-b border-black/10 bg-[#F6F6F6] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/#species"
            className="caption-2 mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors duration-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
          >
            <ArrowLeft size={16} weight="bold" />
            <span>{labels.back}</span>
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="caption-4 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1 font-semibold text-slate-800 shadow-xs">
                    <Tag size={13} weight="bold" />
                    {copy.localName}
                  </span>
                  <span className="caption-4 inline-flex items-center gap-1.5 rounded-full bg-[#181818] px-3 py-1 font-medium text-white">
                    <Sparkle size={13} weight="fill" />
                    {labels.aiSupported}
                  </span>
                  <span className="caption-2 font-medium text-slate-500">
                    {record.scientificName}
                  </span>
                </div>

                <h1 className="heading-1 mt-5 max-w-[680px]">
                  {copy.name}
                </h1>

                <p className="body-3 mt-4 max-w-[680px] text-slate-600">
                  {copy.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={startDownload}
                    className="btn button-md btn-primary inline-flex"
                  >
                    {labels.downloadBtn}
                    <ArrowRight size={18} weight="bold" />
                  </button>
                  <a
                    href="#freshness"
                    className="btn button-md inline-flex border border-black/15 bg-white text-[#181818] transition-colors hover:bg-black/5"
                  >
                    {labels.freshness}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="surface-card relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-white p-6 md:p-10 shadow-sm">
                <img
                  src={record.image}
                  alt={`${copy.name} (${copy.localName})`}
                  className="h-full w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-4 pt-10 text-white">
                  <p className="caption-4 font-normal text-white/80">{record.scientificName}</p>
                  <p className="title-3 font-semibold text-white drop-shadow-xs">
                    {copy.name} · {copy.localName}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Biological & Market Profile Grid ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="heading-2 max-w-[680px]">{labels.profileTitle}</h2>
            <p className="body-3 mt-4 max-w-[680px] text-slate-600">{labels.profileDesc}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Habitat */}
            <Reveal delay={0.05}>
              <article className="surface-card flex h-full flex-col p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-[#F6F6F6] text-[#181818]">
                  <MapPin size={22} weight="bold" />
                </div>
                <h3 className="title-2 mt-6">{labels.habitat}</h3>
                <p className="body-6 mt-3 text-slate-600">{copy.habitat}</p>
              </article>
            </Reveal>

            {/* Size & Weight */}
            <Reveal delay={0.1}>
              <article className="surface-card flex h-full flex-col p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-[#F6F6F6] text-[#181818]">
                  <Scales size={22} weight="bold" />
                </div>
                <h3 className="title-2 mt-6">{labels.sizeWeight}</h3>
                <div className="mt-4 space-y-3">
                  <div>
                    <span className="caption-4 block text-slate-500">{labels.sizeLabel}</span>
                    <p className="body-6 font-medium text-slate-800">{copy.size}</p>
                  </div>
                  <div className="border-t border-black/5 pt-3">
                    <span className="caption-4 block text-slate-500">{labels.weightLabel}</span>
                    <p className="body-6 font-medium text-slate-800">{copy.weight}</p>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* Market Availability */}
            <Reveal delay={0.15}>
              <article className="surface-card flex h-full flex-col p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-[#F6F6F6] text-[#181818]">
                  <Storefront size={22} weight="bold" />
                </div>
                <h3 className="title-2 mt-6">{labels.market}</h3>
                <p className="body-6 mt-3 text-slate-600">{copy.market}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Freshness Indicators Section ── */}
      <section id="freshness" className="border-t border-black/10 bg-[#F6F6F6] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="heading-2 max-w-[680px]">{labels.freshness}</h2>
            <p className="body-3 mt-4 max-w-[680px] text-slate-600">
              {labels.freshnessIntro} <span className="font-semibold text-[#181818]">{copy.name}</span>{' '}
              {labels.freshnessOutro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {copy.freshnessMetrics.map((metric: string, idx: number) => (
              <Reveal key={idx} delay={idx * 0.06}>
                <div className="surface-card flex h-full items-start gap-4 p-6 shadow-xs">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#181818] text-white">
                    <CheckCircle size={20} weight="fill" />
                  </div>
                  <div>
                    <span className="caption-4 font-semibold text-slate-500">
                      {language === 'fil' ? `Palatandaan 0${idx + 1}` : `Indicator 0${idx + 1}`}
                    </span>
                    <p className="body-6 mt-1 text-slate-800">{metric}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Supported Species Switcher ── */}
      <section className="border-t border-black/10 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="heading-2 max-w-[680px]">{labels.otherSpecies}</h2>
            <p className="body-3 mt-4 max-w-[680px] text-slate-600">{labels.otherSpeciesDesc}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {otherSpecies.map((species, index) => (
              <Reveal key={species.id} delay={index * 0.08}>
                <article className="surface-card flex flex-col overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden bg-[#F6F6F6]">
                    <img
                      src={species.image}
                      alt={species.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="caption-4 text-slate-500">{species.localName}</p>
                    <h3 className="title-2 mt-2">{species.name}</h3>
                    <p className="body-6 mt-3 text-slate-600 line-clamp-2">{species.description}</p>
                    <ul className="mt-4 space-y-1.5">
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
                      {labels.viewDetails}
                      <ArrowRight size={18} weight="bold" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Call to Action Section ── */}
      <section className="bg-[#181818] py-16 text-white md:py-24">
        <div className="mx-auto max-w-[680px] px-6 text-center">
          <Reveal>
            <h2 className="heading-2">{labels.ctaTitle}</h2>
            <p className="body-3 mt-4 text-white/80">{labels.ctaDesc}</p>
            <button
              type="button"
              onClick={startDownload}
              className="btn button-md btn-inverse mt-8 inline-flex"
            >
              {labels.downloadBtn}
              <ArrowRight size={18} weight="bold" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
