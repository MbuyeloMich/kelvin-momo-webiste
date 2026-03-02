import React, { useEffect, useState } from "react";
import Navbar from "./layouts/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Album from "./sections/Album";
import LoadingScreen from "./components/LoadingScreen";
import Tours from "./sections/Tours";
import Merch from "./sections/Merch";
import Footer from "./layouts/Footer";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [heroSlide, setHeroSlide] = useState(0);

  const heroImages = [
    `${import.meta.env.BASE_URL}hero.jpg`,
    `${import.meta.env.BASE_URL}hero-2.jpg`,
    `${import.meta.env.BASE_URL}hero-3.jpg`,
    `${import.meta.env.BASE_URL}hero-4.jpg`,
    `${import.meta.env.BASE_URL}hero-5.jpg`,
    `${import.meta.env.BASE_URL}hero-6.jpg`,
    `${import.meta.env.BASE_URL}hero-7.jpg`,
    `${import.meta.env.BASE_URL}hero-8.jpg`,
    `${import.meta.env.BASE_URL}hero-9.jpg`,
    `${import.meta.env.BASE_URL}hero-10.jpg`,
    `${import.meta.env.BASE_URL}hero-11.jpg`,
    `${import.meta.env.BASE_URL}hero-12.jpg`,
  ];

  const handleLoadingFinish = () => {
    setTimeout(() => {
      setLoadingVisible(false);
    }, 500);
  };

  useEffect(() => {
    if (loadingVisible) return undefined;

    const slideInterval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [loadingVisible, heroImages.length]);

  return (
    <>
      {loadingVisible && <LoadingScreen onFinish={handleLoadingFinish} />}
      {!loadingVisible && (
        <div
          className="bg-white relative opacity-0 transition-opacity duration-700"
          style={{ opacity: loadingVisible ? 0 : 1 }}
        >
          <div className="relative min-h-screen w-full overflow-hidden">
            {heroImages.map((image, index) => (
              <div
                key={image}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2500ms] ease-in-out"
                style={{
                  backgroundImage: `url(${image})`,
                  opacity: index === heroSlide ? 1 : 0,
                }}
              />
            ))}
            <div className="relative z-10">
              <Navbar triggerAnimation={!loadingVisible} />
              <Hero triggerAnimation={!loadingVisible} />
            </div>
          </div>
          <About />
          <Album />
          <Tours />
          <Merch />
          <Footer />
          <MusicPlayer />
        </div>
      )}
    </>
  );
}

export default App; 
