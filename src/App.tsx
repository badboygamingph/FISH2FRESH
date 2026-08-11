import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Demo from './pages/Demo';
import SpeciesDetail from './pages/SpeciesDetail';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';
import { DownloadProvider } from './context/DownloadContext';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <DownloadProvider>
          <Helmet>
            <title>FISH2FRESH | AI Fish Freshness Detection</title>
            <meta name="description" content="Use FISH2FRESH's on-device AI model to classify fish freshness in real-time. Completely offline, secure, and private." />
            <link rel="canonical" href="https://fish2fresh.example.com" />
            <meta property="og:title" content="FISH2FRESH | AI Fish Freshness Detection" />
            <meta property="og:description" content="Use FISH2FRESH's on-device AI model to classify fish freshness in real-time. Completely offline, secure, and private." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://fish2fresh.example.com" />
          </Helmet>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/species/:id" element={<SpeciesDetail />} />
              </Routes>
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
