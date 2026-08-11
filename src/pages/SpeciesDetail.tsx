import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, Tag, Activity, Scale, MapPin, Search, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import frigateImg from '../assets/images/frigate_tuna_1786286498933.jpg';
import skipjackImg from '../assets/images/skipjack_tuna_1786286515562.jpg';
import mackerelImg from '../assets/images/mackerel_tuna_1786286531308.jpg';

const speciesData = {
  'frigate-tuna': {
    name: 'Frigate Tuna',
    localName: 'Pirit',
    image: frigateImg,
    accentColor: 'from-indigo-900 to-slate-900',
    scientificName: 'Auxis thazard',
    habitat: 'Tropical and subtropical oceans worldwide.',
    size: 'Up to 65 cm (26 in) in length.',
    weight: 'Typically around 1-2 kg.',
    description: 'The Frigate Tuna (Auxis thazard) is a highly migratory, pelagic species known for its torpedo-shaped body. Often found in large schools, it is characterized by the pattern of wavy dark stripes on the upper back and a distinct silvery belly without spots. Due to its robustness and abundance, it is a staple in local wet markets and highly prized for both commercial and artisanal fishing.',
    freshnessMetrics: [
      'Bright, clear eyes with prominent pupils.',
      'Vivid red gills with no sliminess.',
      'Firm, elastic flesh that springs back when pressed.',
      'A fresh ocean scent rather than a strong "fishy" odor.'
    ]
  },
  'skipjack-tuna': {
    name: 'Skipjack Tuna',
    localName: 'Tulingan',
    image: skipjackImg,
    accentColor: 'from-blue-900 to-slate-900',
    scientificName: 'Katsuwonus pelamis',
    habitat: 'Tropical and warm-temperate waters.',
    size: 'Up to 1 meter (3.3 ft) in length.',
    weight: 'Typically around 3-5 kg.',
    description: 'Skipjack Tuna (Katsuwonus pelamis) is arguably the most commonly consumed tuna species globally, especially in canned form. It is easily identified by the 3 to 5 distinct dark longitudinal stripes running along its silvery lower sides and belly. It is a fast-growing, highly resilient species, making it a critical protein source and an excellent candidate for sustainable harvesting.',
    freshnessMetrics: [
      'Eyes should be bulging and crystal clear.',
      'Gills must be a vibrant scarlet or deep red.',
      'The skin should display a metallic, iridescent luster.',
      'Belly stripes must be sharply defined and unbroken.'
    ]
  },
  'mackerel-tuna': {
    name: 'Mackerel Tuna',
    localName: 'Karaw',
    image: mackerelImg,
    accentColor: 'from-cyan-900 to-slate-900',
    scientificName: 'Euthynnus affinis',
    habitat: 'Coastal waters of the Indo-Pacific.',
    size: 'Up to 100 cm, though usually smaller.',
    weight: 'Usually around 1-3 kg.',
    description: 'Mackerel Tuna (Euthynnus affinis), also known as the Kawakawa, is a coastal species highly valued in Indo-Pacific markets. It features a complex pattern of broken oblique stripes on the back and several distinct dark spots above the pelvic fins. It has a slightly stronger flavor compared to Skipjack, making it popular for curries, grilling, and robust culinary preparations.',
    freshnessMetrics: [
      'Gills should be bright red and free of mucus.',
      'The dark spots above the pelvic fin should be clearly visible.',
      'Skin must be tight, smooth, and highly reflective.',
      'Flesh should feel dense and resilient to the touch.'
    ]
  }
};

export default function SpeciesDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id && speciesData[id as keyof typeof speciesData]) {
      setData(speciesData[id as keyof typeof speciesData]);
    } else {
      setData(null);
    }
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Species Not Found</h1>
        <p className="text-slate-400 mb-8">The fish you are looking for does not exist in our database.</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>{data.name} | FISH2FRESH</title>
        <meta name="description" content={data.description} />
      </Helmet>

      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b ${data.accentColor}`}>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <Link to="/#species" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={20} />
              Back to Species List
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold tracking-wide backdrop-blur-md flex items-center gap-2">
                  <Tag size={14} /> {data.localName}
                </span>
                <span className="text-slate-300 italic text-sm">{data.scientificName}</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 drop-shadow-lg">
                {data.name}
              </h1>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl drop-shadow-md">
                {data.description}
              </p>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-3xl p-8 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-10"></div>
              <img 
                src={data.image} 
                alt={data.name} 
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
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Natural Habitat</h3>
            <p className="text-slate-400 leading-relaxed">{data.habitat}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
              <Scale size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Size & Weight</h3>
            <p className="text-slate-400 leading-relaxed mb-2"><span className="text-slate-200 font-semibold">Size:</span> {data.size}</p>
            <p className="text-slate-400 leading-relaxed"><span className="text-slate-200 font-semibold">Weight:</span> {data.weight}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Market Importance</h3>
            <p className="text-slate-400 leading-relaxed">Highly valued in wet markets for its affordability and high protein content. Best consumed fresh.</p>
          </motion.div>

        </div>

        {/* Freshness Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
            <Search size={250} />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How to Assess Freshness</h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              Before using the FISH2FRESH model, you can visually inspect the {data.name} using these traditional high-quality markers:
            </p>
            
            <ul className="space-y-6">
              {data.freshnessMetrics.map((metric: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-500/20 text-blue-400 rounded-full p-1.5 border border-blue-500/30">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-lg text-slate-200 leading-relaxed">{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
