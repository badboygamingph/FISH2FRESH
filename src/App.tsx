import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';
import { DownloadProvider } from './context/DownloadContext';
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('./pages/Home'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const SpeciesDetail = lazy(() => import('./pages/SpeciesDetail'));

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <DownloadProvider>
          <Helmet>
            <title>FISH2FRESH (Fish 2 Fresh) | AI Fish Freshness Detection</title>
            <meta name="description" content="Use FISH2FRESH (also known as Fish 2 Fresh) on-device AI model to classify fish freshness in real-time. Completely offline, secure, and private." />
            <link rel="canonical" href="https://fish2fresh.vercel.app/" />
            <meta property="og:title" content="FISH2FRESH (Fish 2 Fresh) | AI Fish Freshness Detection" />
            <meta property="og:description" content="Use FISH2FRESH (also known as Fish 2 Fresh) on-device AI model to classify fish freshness in real-time. Completely offline, secure, and private." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://fish2fresh.vercel.app/" />
            <meta property="og:image" content="https://fish2fresh.vercel.app/logo_img.png" />
            <meta property="og:image:alt" content="FISH2FRESH logo" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content="https://fish2fresh.vercel.app/logo_img.png" />
            <meta name="twitter:image:alt" content="FISH2FRESH logo" />
            <link rel="icon" type="image/png" href="/logo_img.png" />
            <link rel="apple-touch-icon" href="/logo_img.png" />
          </Helmet>
          <Router>
            <ScrollToTop />
            <Layout>
              <Suspense fallback={<div className="min-h-screen bg-slate-50"></div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/demo" element={<Navigate to="/" replace />} />
                  <Route path="/species/:id" element={<SpeciesDetail />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
          <Toaster 
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '100px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 500,
              },
            }}
          />
        </DownloadProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}
