import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Remove the Howl import since we're using YouTube now
// import { Howl } from 'howler';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Gallery from './pages/Gallery';
import Future from './pages/Future';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic'; // Import the new component

// Component to conditionally render navbar and footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isHomePage && <Footer />}
    </>
  );
};

function App() {
  return (
    <>
      {/* Background Music - always present and outside Router */}
      <BackgroundMusic />
      
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={
              <Layout>
                <Timeline />
              </Layout>
            } />
            <Route path="/gallery" element={
              <Layout>
                <Gallery />
              </Layout>
            } />
            <Route path="/future" element={
              <Layout>
                <Future />
              </Layout>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;