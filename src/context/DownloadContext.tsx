import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Download, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface DownloadContextType {
  startDownload: () => void;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStep, setDownloadStep] = useState<'idle' | 'preparing' | 'downloading' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  const startDownload = () => {
    setIsDownloading(true);
    setDownloadStep('preparing');
    setProgress(0);
    
    setTimeout(() => {
      setDownloadStep('downloading');
      
      // Simulate progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setProgress(100);
          setDownloadStep('complete');
          
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadStep('idle');
          }, 2500);
        } else {
          setProgress(currentProgress);
        }
      }, 200);
      
    }, 1500);
  };

  return (
    <DownloadContext.Provider value={{ startDownload }}>
      {children}
      
      <AnimatePresence>
        {isDownloading && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => {
                if (downloadStep === 'complete') setIsDownloading(false);
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative z-10 overflow-hidden flex flex-col items-center text-center"
            >
              {/* Background abstract shape */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
              
              <div className="relative z-10 w-full">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-slate-100 shadow-sm relative">
                  <AnimatePresence mode="wait">
                    {downloadStep === 'preparing' && (
                      <motion.div key="preparing" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.5 }} className="text-blue-500">
                        <Smartphone size={36} strokeWidth={1.5} />
                      </motion.div>
                    )}
                    {downloadStep === 'downloading' && (
                      <motion.div key="downloading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5 }} className="text-blue-600">
                        <Download size={36} strokeWidth={1.5} className="animate-bounce" />
                      </motion.div>
                    )}
                    {downloadStep === 'complete' && (
                      <motion.div key="complete" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-emerald-500">
                        <CheckCircle size={40} strokeWidth={2} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {downloadStep === 'downloading' && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90 text-blue-500" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="301.59" strokeDashoffset={301.59 - (progress / 100) * 301.59} className="transition-all duration-300 ease-out" />
                    </svg>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {downloadStep === 'preparing' && "Preparing Download..."}
                  {downloadStep === 'downloading' && "Downloading FISH2FRESH..."}
                  {downloadStep === 'complete' && "Download Started!"}
                </h3>
                
                <p className="text-slate-500 text-sm mb-8">
                  {downloadStep === 'preparing' && "Getting the latest secure offline model."}
                  {downloadStep === 'downloading' && "Please wait while we fetch the APK."}
                  {downloadStep === 'complete' && "Check your device's downloads folder."}
                </p>
                
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className={`h-full rounded-full ${downloadStep === 'complete' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                
                <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span>{Math.round(progress)}%</span>
                  {downloadStep === 'downloading' && <span className="flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> {Math.round(progress * 0.4)}MB / 40MB</span>}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DownloadContext.Provider>
  );
}

export function useDownload() {
  const context = useContext(DownloadContext);
  if (context === undefined) {
    throw new Error('useDownload must be used within a DownloadProvider');
  }
  return context;
}
