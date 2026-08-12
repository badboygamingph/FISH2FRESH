import { motion } from 'motion/react';
import { WifiOff, Cpu, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DotGrid from './DotGrid';

export default function Features() {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: WifiOff,
      title: t.features.f1_title,
      description: t.features.f1_desc,
    },
    {
      icon: Cpu,
      title: t.features.f2_title,
      description: t.features.f2_desc,
    },
    {
      icon: ShieldCheck,
      title: t.features.f3_title,
      description: t.features.f3_desc,
    }
  ];

  return (
    <section id="features" className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100 overflow-hidden">
      {/* Interactive Dot Grid Background */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={6}
          gap={24}
          baseColor="#e2e8f0"
          activeColor="#3b82f6"
          proximity={180}
          shockRadius={250}
        />
      </div>

      {/* Abstract Background Shapes for Glass Effect */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-50 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none mix-blend-multiply" style={{ background: 'radial-gradient(circle, rgba(219,234,254,1) 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-50 translate-x-1/2 translate-y-1/2 z-0 pointer-events-none mix-blend-multiply" style={{ background: 'radial-gradient(circle, rgba(207,250,254,1) 0%, transparent 70%)' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            {t.features.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4, delay: 0.1 }}
            className="text-base md:text-lg text-slate-700 px-2"
          >
            {t.features.desc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: index * 0.1 + 0.1 }}
                className="relative z-10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/60 hover:border-white hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_20px_rgba(15,23,42,0.15)] ring-1 ring-white/20">
                  <Icon size={28} className="drop-shadow-md" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
