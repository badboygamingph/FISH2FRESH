import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Play, Pause, Volume2, VolumeX, Info, CheckCircle2, AlertTriangle, XCircle, Smartphone, Download, Zap, Shield, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';

export default function Demo() {
  const { language } = useLanguage();
  const { startDownload } = useDownload();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState<'fresh' | 'fairlyFresh' | 'spoiled'>('fresh');
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scenarios = {
    fresh: {
      nameEn: 'Fresh (Sariwa)',
      nameFil: 'Sariwa',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: CheckCircle2,
      confidence: '99.2%',
      eyesEn: 'Clear, bulging pupil with high luster',
      eyesFil: 'Malinaw at umbok na pupil',
      gillsEn: 'Vibrant deep pink/red color',
      gillsFil: 'Madiim at sariwang kulay rosas/pula',
      skinEn: 'Firm, elastic flesh with shiny metallic luster',
      skinFil: 'Matigas at makinang na balat',
      recommendationEn: 'Optimal for consumption and immediate cooking.',
      recommendationFil: 'Pinakamagandang kalidad at ligtas lutuin agad.',
    },
    fairlyFresh: {
      nameEn: 'Fairly Fresh (Medyo Sariwa)',
      nameFil: 'Medyo Sariwa',
      badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      icon: AlertTriangle,
      confidence: '96.8%',
      eyesEn: 'Slightly flat pupil with minor cloudiness',
      eyesFil: 'Medyo malabo at pantay na pupil',
      gillsEn: 'Faded reddish-brown tint',
      gillsFil: 'Namumutlang kulay ng hasang',
      skinEn: 'Slightly reduced luster; flesh remains acceptable',
      skinFil: 'Medyo bawas ang kinang ng balat',
      recommendationEn: 'Safe for consumption. Cook thoroughly within 12 hours.',
      recommendationFil: 'Ligtas kainin. Lutuing mabuti sa loob ng 12 oras.',
    },
    spoiled: {
      nameEn: 'Spoiled (Bilasa)',
      nameFil: 'Bilasa',
      badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      icon: XCircle,
      confidence: '98.9%',
      eyesEn: 'Sunken, cloudy, and bloodshot pupil',
      eyesFil: 'Lubog at malabong mata',
      gillsEn: 'Dull brown or grayish discoloration',
      gillsFil: 'Kulay tsokolate o kulay-abo na may amoy',
      skinEn: 'Soft, mushy body flesh with faded scales',
      skinFil: 'Malambot na balat at nawalan ng kinang',
      recommendationEn: 'Do NOT purchase or consume. Clear signs of spoilage.',
      recommendationFil: 'Huwag bilhin o kainin. May senyales na ng pagkasira.',
    },
  };

  const currentInfo = scenarios[selectedScenario];
  const StatusIcon = currentInfo.icon;

  return (
    <div className="py-20 md:py-32 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-slate-500 mb-8 mt-4">
            <Link to="/" className="flex items-center hover:text-blue-600 transition-colors">
              <Home size={16} className="mr-1" />
              {language === 'en' ? 'Home' : 'Home'}
            </Link>
            <ChevronRight size={16} className="mx-2 text-slate-400" />
            <span className="text-slate-900 font-medium">
              {language === 'en' ? 'App Video Demo' : 'Video Demo ng App'}
            </span>
          </nav>

          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between mb-10">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {language === 'en' ? 'FISH2FRESH Video Showcase' : 'FISH2FRESH Video Showcase'}
              </h1>
              <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl">
                {language === 'en'
                  ? 'Watch our on-device Mobile Neural Network analyze eyes, gills, and skin structure in real-time without an internet connection.'
                  : 'Panoorin kung paano sinusuri ng aming AI ang mata, hasang, at balat nang real-time kahit walang koneksyon sa internet.'}
              </p>
            </div>

            <button
              onClick={startDownload}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-slate-900/20 active:scale-95 shrink-0"
            >
              <Smartphone size={18} />
              <span>{language === 'en' ? 'Download APK' : 'I-download ang APK'}</span>
            </button>
          </div>

          {/* Interactive Scenario Selector Tabs */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider self-center mr-2">
              {language === 'en' ? 'Select Scan Condition:' : 'Pumili ng Kondisyon:'}
            </span>
            {(['fresh', 'fairlyFresh', 'spoiled'] as const).map((key) => {
              const active = selectedScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    active
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {language === 'en' ? scenarios[key].nameEn : scenarios[key].nameFil}
                </button>
              );
            })}
          </div>

          {/* Video Player Card */}
          <div className="bg-slate-950 rounded-[2rem] p-3 md:p-5 shadow-2xl shadow-slate-900/30 border border-slate-800 overflow-hidden relative">
            <div className="aspect-video bg-slate-900 rounded-[1.5rem] relative overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1200&q=80"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Real-time AI Classification HUD Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none p-6 flex flex-col justify-between">
                {/* Top Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-xs font-mono text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>NPU inference: 12.4ms</span>
                  </div>
                  <div className={`px-3.5 py-1 rounded-full border text-xs font-bold font-mono uppercase tracking-wider backdrop-blur-md ${currentInfo.badgeClass}`}>
                    {language === 'en' ? currentInfo.nameEn : currentInfo.nameFil}
                  </div>
                </div>

                {/* Center Bounding Frame */}
                <div className="self-center w-2/3 h-2/3 border-2 border-dashed border-blue-400/70 rounded-2xl relative flex items-center justify-center">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-mono px-3 py-0.5 rounded-full uppercase tracking-wider">
                    TARGET: Auxis thazard (Pirit)
                  </div>
                </div>

                {/* Bottom HUD Bar */}
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <div>Model: MobileNetV3-Quantized</div>
                  <div>Confidence: {currentInfo.confidence}</div>
                </div>
              </div>

              {/* Video Playback Controls */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-center transition-all duration-200 active:scale-90"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-center transition-all duration-200 active:scale-90"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>

            {/* Analysis Detail Drawer */}
            <div className="mt-4 p-5 bg-slate-900 rounded-2xl border border-slate-800 text-slate-300 text-sm grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <StatusIcon className="text-blue-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-semibold text-white text-xs uppercase tracking-wider mb-1">
                    {language === 'en' ? 'Eye Marker Analysis' : 'Pagsusuri sa Mata'}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {language === 'en' ? currentInfo.eyesEn : currentInfo.eyesFil}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <StatusIcon className="text-blue-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-semibold text-white text-xs uppercase tracking-wider mb-1">
                    {language === 'en' ? 'Gill Color Analysis' : 'Pagsusuri sa Hasang'}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {language === 'en' ? currentInfo.gillsEn : currentInfo.gillsFil}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <StatusIcon className="text-blue-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-semibold text-white text-xs uppercase tracking-wider mb-1">
                    {language === 'en' ? 'Skin & Flesh Texture' : 'Pagsusuri sa Balat'}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {language === 'en' ? currentInfo.skinEn : currentInfo.skinFil}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Callout Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Zero Latency</h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                {language === 'en'
                  ? 'All frame predictions complete in under 20 milliseconds directly on the mobile GPU or NPU.'
                  : 'Ang lahat ng pagsusuri ay natatapos sa loob lamang ng 20 milliseconds sa mismong cellphone.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">100% Offline</h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                {language === 'en'
                  ? 'No cloud servers or cellular data needed. Ideal for wet market conditions with poor signal.'
                  : 'Hindi kailangan ng internet o data. Gamitin sa palengke kahit walang signal.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Cpu size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">On-Device Privacy</h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                {language === 'en'
                  ? 'Camera streams stay strictly on your phone. No images or telemetry are ever uploaded.'
                  : 'Ang camera feed ay mananatili sa iyong telepono. Walang litratong ina-upload.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
