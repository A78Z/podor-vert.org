import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const impactData = [
  { location: 'Dioudé', trees: 380, emoji: '🌳', image: '/images/gallery/arbre-380.png' },
  { location: 'Wouro Alpha', trees: 40, emoji: '🌿', image: '/images/gallery/arbres-40.png' },
  { location: 'Wallah', trees: 56, emoji: '🌱', image: '/images/gallery/arbres-56.png' },
  { location: 'Soubalo mboumba', trees: 70, emoji: '🌳', image: '/images/gallery/arbres-70.png' },
  { location: 'Abdallah walo', trees: 100, emoji: '🌿', image: '/images/gallery/arbres-100.png' },
  { location: 'Fondé elimane', trees: 166, emoji: '🌱', image: '/images/gallery/arbres-166.png' },
  { location: 'Mitto', trees: 170, emoji: '🌳', image: '/images/gallery/arbres-170.png' },
  { location: 'Souraye', trees: 270, emoji: '🌿', image: '/images/gallery/arbres-270.png' },
  { location: 'Thioubalel', trees: 410, emoji: '🌱', image: '/images/gallery/arbres-410.png' },
  { location: 'Dounguel', trees: 105, emoji: '🌳', image: '/images/gallery/arbres-105.png' },
  { location: 'Village hamo', trees: 110, emoji: '🌿', image: '/images/gallery/arbres-110.png' },
];

const ImpactCarousel: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-green-50/50 to-white overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg mb-4">
            🌿 Activités de reboisement 🌿
          </h2>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Depuis octobre 2022, à la pépinière de Thioubalel, découvrez l’impact concret de nos actions sur le terrain depuis notre création.
          </p>
        </motion.div>

        <div className="impact-carousel">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: '!bg-green-600',
            }}
            navigation={true}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="!pb-16"
          >
            {impactData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-square rounded-2xl overflow-hidden group shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.location}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-500"></div>
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold drop-shadow-lg group-hover:text-yellow-300 transition-colors duration-500">
                      {item.location}
                    </h3>
                    <p className="text-lg font-semibold text-green-300 drop-shadow-md">
                      {item.trees} arbres {item.emoji}
                    </p>
                  </div>
                  {/* Glow hover border */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-green-400/70 transition duration-500"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ImpactCarousel;
