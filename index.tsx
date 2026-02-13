import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import SplashScreen from './components/SplashScreen';
import ResearchPage from './components/ResearchPage';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/segmentation" element={<App />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/heritage" element={<ComingSoonPage title="Heritage" />} />
        <Route path="/brand-id" element={<ComingSoonPage title="Brand ID" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
      <h1 className="font-mono text-4xl font-bold mb-4">{title}</h1>
      <p className="font-mono text-[#8a8a8a] mb-8">Coming Soon</p>
      <a 
        href="/" 
        className="px-6 py-3 border-2 border-white font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all"
      >
        Back to Home
      </a>
      <Analytics />
    </div>
  );
}
