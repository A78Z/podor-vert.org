import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/images/slide_engagement.jpg',
      title: 'Bienvenue sur le site officiel de Podor Vert',
      subtitle: 'Un avenir vert commence ici',
      buttons: [
        { text: 'Devenir partenaire', link: '/devenir-partenaire', style: 'white' },
        { text: 'Soutenir nos actions', link: '/devenir-donateur', style: 'green' }
      ]
    },
    {
      id: 2,
      image: '/images/slidepodorvert3.jpeg',
      title: 'Ensemble pour un Podor plus vert',
      subtitle: 'Mobilisation citoyenne et actions locales durables',
      buttons: [
        { text: 'Découvrir nos actions', link: '/activites', style: 'green' }
      ]
    },
    {
      id: 3,
      image: '/images/slidepodorvert2.JPG',
      title: 'Reboiser aujourd’hui pour protéger demain',
      subtitle: 'Des milliers d’arbres plantés pour l’avenir',
      buttons: [
        { text: 'Voir nos résultats', link: '/resultats', style: 'white' }
      ]
    },
    {
      id: 4,
      image: '/images/slidepodorvert4.jpeg',
      title: 'Former la génération verte',
      subtitle: 'Les écoles au cœur du changement climatique',
      buttons: [
        { text: 'Inscrire une école', link: '/contact', style: 'white' }
      ]
    },
    {
      id: 5,
      image: '/images/slidepodorvert1.JPG',
      title: 'Agissez maintenant',
      subtitle: 'Chaque geste compte pour un Sénégal durable',
      buttons: [
        { text: 'Faire un don', link: '/devenir-donateur', style: 'yellow' },
        { text: 'Nous contacter', link: '/contact', style: 'transparent' }
      ]
    }
  ];

  // Auto-play functionality with slower transition (7s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
          />

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/40 to-black/20" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-0">
            <div className="max-w-5xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl tracking-tight"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-3xl text-gray-100 font-light mb-10 drop-shadow-md tracking-wide"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-5 justify-center"
              >
                {slides[currentSlide].buttons.map((btn, idx) => (
                  <Link key={idx} to={btn.link}>
                    <button className={`
                      group relative px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3
                      ${btn.style === 'green' ? 'bg-green-600 text-white hover:bg-green-500 shadow-green-900/50' : ''}
                      ${btn.style === 'white' ? 'bg-white text-green-800 hover:bg-gray-100 shadow-black/20' : ''}
                      ${btn.style === 'yellow' ? 'bg-yellow-400 text-green-900 hover:bg-yellow-300 shadow-yellow-900/50' : ''}
                      ${btn.style === 'transparent' ? 'border-2 border-white text-white hover:bg-white/10' : ''}
                    `}>
                      {btn.text}
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Premium Round Style) */}
      <button
        onClick={goToPrevious}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 z-20 hover:scale-110 hidden md:flex"
      >
        <ChevronLeft className="w-8 h-8 opacity-80" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 z-20 hover:scale-110 hidden md:flex"
      >
        <ChevronRight className="w-8 h-8 opacity-80" />
      </button>

      {/* Modern Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full ${index === currentSlide
                ? 'w-12 h-3 bg-white shadow-lg'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
