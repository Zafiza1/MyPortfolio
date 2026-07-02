import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/Background";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";

// Lazy load all pages and components for better performance
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Portofolio = lazy(() => import("./Pages/Portofolio"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const Login = lazy(() => import("./Pages/Login"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const WelcomeScreen = lazy(() => import("./Pages/WelcomeScreen"));
const NotFoundPage = lazy(() => import("./Pages/404"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  const [contentReady, setContentReady] = useState(false);
  const mainContentRef = useRef(null);

  useEffect(() => {
    if (!showWelcome && !contentReady) {
      // Allow DOM to render first, then force scroll
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        setContentReady(true);
      }, 100);
    }
  }, [showWelcome, contentReady]);

  return (
    <>
      {showWelcome && (
        <Suspense fallback={<LoadingSpinner />}>
          <WelcomeScreen onLoadingComplete={() => {
            setShowWelcome(false);
          }} />
        </Suspense>
      )}

      {!showWelcome && (
        <div 
          ref={mainContentRef}
          key="main-content" 
          style={{ minHeight: '100vh', opacity: contentReady ? 1 : 0, transition: 'opacity 0.3s ease' }}
        >
          <Navbar />
      
          <Suspense fallback={<div className="h-20" />}>
            <Home />
          </Suspense>
          
          <Suspense fallback={<div className="h-20" />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<div className="h-20" />}>
            <Portofolio />
          </Suspense>
          
          <Suspense fallback={<div className="h-20" />}>
            <ContactPage />
          </Suspense>
          
          <Footer />
        </div>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectDetails />
    </Suspense>
    <Footer />
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    
    <HelmetProvider>
      {/* <div className="pointer-events-none">
  <AnimatedBackground />
</div> */}
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* PUBLIC */}
          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            }
          />

          <Route path="/project/:slug" element={<ProjectPageLayout />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />

          {/* ADMIN (PROTECTED) */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;