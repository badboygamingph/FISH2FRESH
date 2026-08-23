import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Smartphone, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';

export default function VideoShowcase() {
  const { t } = useLanguage();
  const { startDownload } = useDownload();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
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

  return (
    <section id="video-showcase" className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }}></div>
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm font-semibold tracking-wide uppercase mb-4"
          >
            <Sparkles size={16} className="animate-pulse" />
            {t.showcase.tag}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            {t.showcase.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-light leading-relaxed"
          >
            {t.showcase.desc}
          </motion.p>
        </div>

        {/* Video Player Frame Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-blue-900/20 bg-slate-950"
        >
          {/* Top Bar Header inside frame */}
          <div className="px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block"></span>
              <span className="font-semibold text-slate-200 uppercase tracking-wider">{t.showcase.badge}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <span className="flex items-center gap-1"><Zap size={14} className="text-amber-400" /> 14ms Latency</span>
              <span className="hidden sm:flex items-center gap-1"><ShieldCheck size={14} className="text-blue-400" /> Offline Ready</span>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video bg-slate-950 overflow-hidden group">
            {/* Embedded Auto-playing Teaser Video */}
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
              Your browser does not support the video tag.
            </video>

            {/* AI HUD Overlay Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none">
              {/* Scanning Target Box */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center p-4">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                {/* Vertical Laser Scan Line */}
                <motion.div
                  animate={{ y: ['-120%', '120%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981]"
                ></motion.div>

                {/* Target Result Floating Badge */}
                <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-500/40 text-center shadow-lg">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                    <CheckCircle2 size={16} />
                    <span>CLASSIFICATION: FRESH (SARIWA)</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                    {t.showcase.confidence}
                  </div>
                </div>
              </div>

              {/* Bottom HUD Metrics Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-[11px] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                  {t.showcase.scanning}
                </div>
                <div className="hidden sm:block bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-[11px]">
                  Auxis thazard (Frigate Tuna / Pirit)
                </div>
              </div>
            </div>

            {/* Video Control Buttons Overlay */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-center transition-all duration-200 active:scale-90"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-center transition-all duration-200 active:scale-90"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>

          {/* Frame Bottom Actions Bar */}
          <div className="p-6 md:p-8 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Want to see the complete test suite & interactive features?
              </h3>
              <p className="text-sm text-slate-400 font-light">
                Explore species guides, indicator analysis, and full offline scenario testing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link
                to="/demo"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 active:scale-95 text-sm"
              >
                <span>{t.showcase.watchFullDemo}</span>
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={startDownload}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-6 py-3.5 rounded-full font-semibold transition-all duration-300 active:scale-95 text-sm"
              >
                <Smartphone size={18} />
                <span>{t.showcase.downloadApp}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
