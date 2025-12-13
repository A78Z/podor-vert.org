import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const impactData = [
  {
    location: 'BELEL KELLÉ',
    description: 'Une pépinière communautaire où plus de 2 000 plants sont préparés pour reverdir la zone.',
    image: '/images/gallery/pepi1.jpeg'
  },
  {
    location: 'BELEL KELLÉ',
    description: 'Des jeunes mobilisés pour planter et entretenir des arbres afin de lutter contre la désertification.',
    image: '/images/gallery/pepi2.jpeg'
  },
  {
    location: 'BELEL KELLÉ',
    description: 'Un projet qui redonne espoir aux communautés locales avec la culture de nouvelles essences d’arbres.',
    image: '/images/gallery/pepi3.jpeg'
  },
  {
    location: 'BELEL KELLÉ',
    description: 'Une dynamique locale forte pour un avenir plus vert et durable.',
    image: '/images/gallery/pepi4.jpeg'
  },
  {
    location: 'BELEL KELLÉ',
    description: 'Des actions concrètes menées par podor vert pour restaurer l\'environnement.',
    image: '/images/gallery/pepi5.jpeg'
  },
  {
    location: 'BELEL KELLÉ',
    description: 'Une mobilisation exemplaire pour reverdir la vallée et renforcer la biodiversité.',
    image: '/images/gallery/pepi6.jpeg'
  },
  {
    location: 'MBIDDI',
    description: 'Suivi reboisement à MBIDDI (dans le Diery)',
    image: '/images/gallery/pepi7.jpeg'
  },
  {
    location: 'MBIDDI',
    description: 'Suivi reboisement à MBIDDI (dans le Diery)',
    image: '/images/gallery/pepi8.jpeg'
  },
  {
    location: 'MBIDDI',
    description: 'Suivi reboisement à MBIDDI (dans le Diery)',
    image: '/images/gallery/pepi9.jpeg'
  },
  {
    location: 'MBIDDI',
    description: 'Suivi reboisement à MBIDDI (dans le Diery)',
    image: '/images/gallery/pepi10.jpeg'
  },
  {
    location: 'MBIDDI',
    description: 'Suivi reboisement à MBIDDI (dans le Diery)',
    image: '/images/gallery/pepi11.jpeg'
  },
  {
    location: 'MBIDDI',
    description: 'Suivi reboisement à MBIDDI (dans le Diery)',
    image: '/images/gallery/pepi12.jpeg'
  },
  {
    location: 'SALNDÉ FANAYE',
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY',
    image: '/images/gallery/1reboisement-salnde-fanaye.jpg'
  },
  {
    location: 'SALNDÉ FANAYE',
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY',
    image: '/images/gallery/2reboisement-salnde-fanaye.jpg'
  },
  {
    location: 'SALNDÉ FANAYE',
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY',
    image: '/images/gallery/3reboisement-salnde-fanaye.jpg'
  },
  {
    location: 'SALNDÉ FANAYE',
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY',
    image: '/images/gallery/4reboisement-salnde-fanaye.jpg'
  },
  {
    location: 'SALNDÉ FANAYE',
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY',
    image: '/images/gallery/5reboisement-salnde-fanaye.jpg'
  },
  {
    location: 'SALNDÉ FANAYE',
    description: 'Journée de reboisement à Salndé Fanaye avec l’Ambassadeur Amadou SY',
    image: '/images/gallery/6reboisement-salnde-fanaye.jpg'
  },
];

const PepinieresSlider: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-green-50/50 via-white to-green-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Header with Premium Styling */}
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg mb-6 inline-flex items-center gap-3">
            🌱 Nos Nouvelles Pépinières
          </h2>

          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Découvrez les pépinières communautaires qui redonnent vie à nos territoires
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-4 px-2 lg:px-0">

          {/* Custom Prev Arrow (Desktop only) */}
          <button className="nav-arrow nav-left hidden md:flex custom-swiper-prev">
            <span className="text-2xl font-bold">‹</span>
          </button>

          <div className="w-full overflow-hidden">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                bulletActiveClass: 'swiper-pagination-bullet-custom-active',
              }}
              navigation={{
                nextEl: '.custom-swiper-next',
                prevEl: '.custom-swiper-prev',
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 24 },
                768: { slidesPerView: 2, spaceBetween: 32 },
                1280: { slidesPerView: 3, spaceBetween: 40 },
              }}
              className="!pb-16 !overflow-visible"
            >
              {impactData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
                    {/* Image with zoom effect */}
                    <img
                      src={item.image}
                      alt={item.location}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/40 to-transparent transition-opacity duration-500"></div>

                    {/* Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                        🌱 Pépinière communautaire
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-3xl font-extrabold text-white mb-3 drop-shadow-md">
                        {item.location}
                      </h3>

                      <p className="text-green-50 text-lg leading-snug font-medium mb-4 opacity-90">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 text-green-300 text-sm font-bold uppercase tracking-wider">
                        <span className="w-8 h-[2px] bg-green-400"></span>
                        Découvrir
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Custom Next Arrow (Desktop only) */}
          <button className="nav-arrow nav-right hidden md:flex custom-swiper-next">
            <span className="text-2xl font-bold">›</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PepinieresSlider;
