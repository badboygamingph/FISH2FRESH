import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, Tag, Activity, Scale, MapPin, Search, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
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
    image: bulletImg,
    accentColor: 'from-indigo-900 to-slate-900',
    scientificName: 'Auxis rochei',
    en: {
      name: 'Bullet Tuna',
      localName: 'Pirit',
      habitat: 'Coastal waters and around islands, from near the surface to about 200 m.',
      size: 'Up to 50 cm fork length.',
      weight: 'Up to 1.84 kg.',
      market: 'Sold fresh or frozen in wet markets, and also dried, salted, smoked, or canned.',
      description: 'Bullet tuna (Auxis rochei) is the small tuna sold in the market as Pirit. Adults school in coastal water and around islands, from near the surface to about 200 m. The back is bluish, turning deep purple or almost black on the head, and the belly is white. The scaleless area carries 15 or more fairly broad, nearly vertical dark bars. The pectoral fins are short and do not reach the front of that scaleless area. A wide corselet of scales covers the shoulder, more than 6 scales wide under the second dorsal fin, and the rest of the body is bare. It feeds on small fishes, especially anchovies, plus crustaceans and squid. FishBase records a maximum of 50 cm fork length and a maximum reported age of 5 years. Published weight reaches 1.84 kg. In the Philippines, length at 50 percent maturity is about 18.8 cm fork length.',
      freshnessMetrics: [
        'Eyes are bright, clear, and bulging, with a dark pupil.',
        'Gills are vivid red and free of slime.',
        'Flesh is firm and springs back when pressed.',
        'The dark back bars stay sharp, and the smell is clean and oceanic rather than sour.'
      ]
    },
    fil: {
      name: 'Pirit',
      localName: 'Bullet Tuna',
      habitat: 'Baybayin at paligid ng mga isla, mula malapit sa ibabaw hanggang mga 200 m.',
      size: 'Hanggang 50 cm fork length.',
      weight: 'Hanggang 1.84 kg.',
      market: 'Ibinebenta nang sariwa o frozen sa palengke, at pinatutuyo, inaasinan, pinauusukan, o de lata rin.',
      description: 'Ang bullet tuna (Auxis rochei) ang maliit na tuna na Pirit sa palengke. Namumundok ang mga adulto sa baybayin at sa paligid ng mga isla, mula malapit sa ibabaw hanggang mga 200 m. Asul ang likod, nagiging malalim na lila o halos itim sa ulo, at puti ang tiyan. May 15 o higit pang medyo malapad at halos patayong maitim na guhit sa bahaging walang kaliskis. Maikli ang palikpik sa dibdib at hindi umaabot sa harap ng bahaging iyon. Malapad ang corselet ng kaliskis, higit sa 6 na hanay sa ilalim ng ikalawang palikpik sa likod, at hubad ang katawan sa likod nito. Kumakain ito ng maliliit na isda, lalo na ang dilis, pati hipon at pusit. Ayon sa FishBase, umaabot ito sa 50 cm fork length at 5 taon. Umaabot ang timbang sa 1.84 kg. Sa Pilipinas, mga 18.8 cm fork length ang haba kapag kalahati ng mga isda ay handa nang mangitlog.',
      freshnessMetrics: [
        'Maliwanag, malinaw, at umbok ang mata, at maitim ang pupil.',
        'Matingkad na pula ang hasang at walang malapot.',
        'Matigas ang laman at bumabalik kapag pinindot.',
        'Malinaw pa ang maitim na guhit sa likod, at amoy dagat ito, hindi maasim.'
      ]
    }
  },
  'skipjack-tuna': {
    image: skipjackImg,
    accentColor: 'from-blue-900 to-slate-900',
    scientificName: 'Katsuwonus pelamis',
    en: {
      name: 'Skipjack Tuna',
      localName: 'Tulingan',
      habitat: 'Offshore tropical and warm temperate seas, from the surface to 260 m.',
      size: 'Up to 110 cm fork length. Common length about 80 cm.',
      weight: 'Up to 34.5 kg.',
      market: 'Sold fresh, frozen, or canned, and also dried, salted, or smoked.',
      description: 'Skipjack tuna (Katsuwonus pelamis) is the offshore tuna sold as Tulingan. The back is dark purplish blue and the lower sides and belly are silver, with 4 to 6 very clear longitudinal dark bands. The body is scaleless except for the corselet and the lateral line, and the two dorsal fins are separated by a gap no larger than the eye. It schools at the surface in tropical and warm temperate seas, from the surface to 260 m, usually in water of 15°C to 30°C. It feeds on fishes, crustaceans, and squid. FishBase records a maximum of 110 cm fork length, a common length of 80 cm, a maximum published weight of 34.5 kg, and a maximum reported age of 12 years. Most fish mature between 40 and 45 cm.',
      freshnessMetrics: [
        'Eyes are bulging and clear.',
        'Gills are scarlet or deep red, not brown or gray.',
        'The 4 to 6 belly bands stay dark and unbroken.',
        'The skin keeps a metallic sheen and the body stays firm.'
      ]
    },
    fil: {
      name: 'Tulingan',
      localName: 'Skipjack Tuna',
      habitat: 'Laot na tropikal at maligamgam, mula sa ibabaw hanggang 260 m.',
      size: 'Hanggang 110 cm fork length. Karaniwang mga 80 cm.',
      weight: 'Hanggang 34.5 kg.',
      market: 'Ibinebenta nang sariwa, frozen, o de lata, at pinatutuyo, inaasinan, o pinauusukan din.',
      description: 'Ang skipjack tuna (Katsuwonus pelamis) ang Tulingan. Madilim na lila asul ang likod, pilak ang ibabang tagiliran at tiyan, at may 4 hanggang 6 na malinaw na mahabang maitim na guhit. Hubad ang katawan maliban sa corselet at lateral line. Maliit ang puwang ng dalawang palikpik sa likod, hindi lalampas sa laki ng mata. Namumundok ito sa ibabaw ng tropikal at maligamgam na dagat, mula sa ibabaw hanggang 260 m, karaniwan sa tubig na 15°C hanggang 30°C. Kumakain ito ng isda, hipon, at pusit. Ayon sa FishBase, umaabot ito sa 110 cm fork length, karaniwan ay mga 80 cm, may pinakamabigat na 34.5 kg, at pinakamahabang naiulat na edad na 12 taon. Karaniwang hinog ito sa 40 hanggang 45 cm.',
      freshnessMetrics: [
        'Umbok at malinaw ang mata.',
        'Iskarlata o malalim na pula ang hasang, hindi kayumanggi o kulay abo.',
        'Madilim at tuloy tuloy pa ang 4 hanggang 6 na guhit sa tiyan.',
        'May metalikong kinang ang balat at matigas ang katawan.'
      ]
    }
  },
  'yellowfin-tuna': {
    image: yellowfinImg,
    accentColor: 'from-cyan-900 to-slate-900',
    scientificName: 'Thunnus albacares',
    en: {
      name: 'Yellowfin Tuna',
      localName: 'Karaw',
      habitat: 'Open tropical and subtropical oceans, usually from 1 m to 250 m. Absent from the Mediterranean.',
      size: 'Up to 239 cm fork length. Common length about 150 cm.',
      weight: 'Up to 200 kg.',
      market: 'Sold fresh, frozen, canned, or smoked. Valued for sashimi.',
      description: 'Yellowfin tuna (Thunnus albacares) is the large oceanic tuna sold as Karaw. The back is metallic dark blue, changing through yellow to silver on the belly, which is often crossed by about 20 broken, nearly vertical lines. The second dorsal fin, the anal fin, and the finlets are bright yellow, and each finlet has a narrow black edge. On large fish the second dorsal and anal fins grow very long, well over 20 percent of the fork length. Pectoral fins are moderately long and usually reach past the start of the second dorsal fin, but not past the end of its base. Scales are very small, and a swim bladder is present. It lives in open tropical and subtropical seas, usually from 1 m to 250 m, and it is absent from the Mediterranean. It schools by size and feeds on fishes, crustaceans, and squid. FishBase records a maximum of 239 cm fork length, a common length of 150 cm, a maximum published weight of 200 kg, and a maximum reported age of 18 years.',
      freshnessMetrics: [
        'Eyes are clear and bulging.',
        'Gills are bright red and free of mucus.',
        'Yellow fins and finlets still look bright, not dull or gray.',
        'Flesh is dense, and the smell is clean and like the sea.'
      ]
    },
    fil: {
      name: 'Karaw',
      localName: 'Yellowfin Tuna',
      habitat: 'Bukas na tropikal at subtropikal na karagatan, karaniwan mula 1 m hanggang 250 m. Wala sa Mediterranean.',
      size: 'Hanggang 239 cm fork length. Karaniwang mga 150 cm.',
      weight: 'Hanggang 200 kg.',
      market: 'Ibinebenta nang sariwa, frozen, de lata, o pinauusukan. Mataas ang halaga para sa sashimi.',
      description: 'Ang yellowfin tuna (Thunnus albacares) ang malaking tuna sa laot na Karaw. Metalikong madilim na asul ang likod, dilaw hanggang pilak ang tiyan, na madalas may mga 20 putol putol at halos patayong guhit. Matingkad na dilaw ang ikalawang palikpik sa likod, ang palikpik sa puwit, at ang mga finlet, at may manipis na itim na gilid ang bawat finlet. Sa malalaking isda, humahaba nang husto ang ikalawang palikpik sa likod at ang palikpik sa puwit, higit sa 20 porsiyento ng fork length. Katamtaman ang haba ng palikpik sa dibdib: umaabot ito lampas sa simula ng ikalawang palikpik sa likod, pero hindi lagpas sa dulo ng base nito. Napakaliit ng mga kaliskis at may swim bladder. Nasa bukas na tropikal at subtropikal na dagat ito, karaniwan mula 1 m hanggang 250 m, at wala ito sa Mediterranean. Namumundok ayon sa laki at kumakain ng isda, hipon, at pusit. Ayon sa FishBase, umaabot ito sa 239 cm fork length, karaniwan ay mga 150 cm, may pinakamabigat na 200 kg, at pinakamahabang naiulat na edad na 18 taon.',
      freshnessMetrics: [
        'Malinaw at umbok ang mata.',
        'Matingkad na pula ang hasang at walang mucus.',
        'Matingkad pa ang dilaw na palikpik at finlet, hindi mapurol o kulay abo.',
        'Siksik ang laman at malinis ang amoy dagat.'
      ]
    }
  }
} as const;

const speciesAliases: Record<string, keyof typeof speciesData> = {
  'frigate-tuna': 'bullet-tuna',
  'mackerel-tuna': 'yellowfin-tuna'
};

export default function SpeciesDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const resolvedId = id ? (speciesAliases[id] ?? id) : '';
  const record = speciesData[resolvedId as keyof typeof speciesData];
  const copy: SpeciesCopy | undefined = record ? record[language] : undefined;
  const labels = language === 'fil'
    ? {
        back: 'Bumalik sa listahan',
        habitat: 'Tirahan',
        sizeWeight: 'Haba at timbang',
        size: 'Haba',
        weight: 'Timbang',
        market: 'Sa palengke',
        freshness: 'Paano tingnan ang pagkasariwa',
        freshnessIntro: 'Bago gamitin ang FISH2FRESH, tingnan muna ang',
        freshnessOutro: 'gamit ang mga palatandaang ito.',
        missingTitle: 'Hindi nahanap ang isda',
        missingBody: 'Wala sa talaan ang isdang hinahanap mo.',
        home: 'Bumalik sa umpisa'
      }
    : {
        back: 'Back to species list',
        habitat: 'Habitat',
        sizeWeight: 'Size and weight',
        size: 'Size',
        weight: 'Weight',
        market: 'At the market',
        freshness: 'How to check freshness',
        freshnessIntro: 'Before you use FISH2FRESH, you can look over the',
        freshnessOutro: 'with these markers.',
        missingTitle: 'Species not found',
        missingBody: 'That fish is not in the supported list.',
        home: 'Return home'
      };

  if (!record || !copy) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8 text-[#181818]">
        <h1 className="heading-3 mb-4">{labels.missingTitle}</h1>
        <p className="body-3 mb-8 text-slate-600">{labels.missingBody}</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold transition-colors">
          {labels.home}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#181818]">
      <Helmet>
        <title>{copy.name} | FISH2FRESH</title>
        <meta name="description" content={copy.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F6F6F6] pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <Link to="/#species" className="caption-2 mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-black">
              <ArrowLeft size={20} />
              {labels.back}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold tracking-wide backdrop-blur-md flex items-center gap-2">
                  <Tag size={14} /> {copy.localName}
                </span>
                <span className="caption-2 text-slate-500">{record.scientificName}</span>
              </div>
              <h1 className="heading-1 mb-6 max-w-[680px]">
                {copy.name}
              </h1>
              <p className="body-3 max-w-[680px] text-slate-600">
                {copy.description}
              </p>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              className="surface-card relative flex aspect-video w-full items-center justify-center overflow-hidden p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-10"></div>
              <img
                src={record.image}
                alt={copy.name}
                className="relative z-20 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="surface-card p-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
              <MapPin size={24} />
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-xl font-bold mb-3">{labels.habitat}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{copy.habitat}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="surface-card p-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
              <Scale size={24} />
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-xl font-bold mb-3">{labels.sizeWeight}</h2>
              <p className="text-slate-600 leading-relaxed text-lg"><span className="text-slate-800 font-semibold">{labels.size}:</span> {copy.size}</p>
              <p className="text-slate-400 leading-relaxed"><span className="text-slate-800 font-semibold">{labels.weight}:</span> {copy.weight}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="surface-card p-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Activity size={24} />
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-xl font-bold mb-3">{labels.market}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{copy.market}</p>
            </div>
          </motion.div>

        </div>

        {/* Freshness Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="surface-card relative mt-12 overflow-hidden p-6 md:p-12"
        >
          <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
            <Search size={250} />
          </div>

          <div className="relative z-10 max-w-3xl">
            <h2 className="heading-3 mb-6">{labels.freshness}</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {labels.freshnessIntro} {copy.name} {labels.freshnessOutro}
            </p>

            <ul className="space-y-6">
              {copy.freshnessMetrics.map((metric: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-500/20 text-blue-400 rounded-full p-1.5 border border-blue-500/30">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-lg text-slate-800 leading-relaxed">{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
