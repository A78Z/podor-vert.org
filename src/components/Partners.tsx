import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Handshake, Globe, Briefcase, Calculator, Building2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

interface Partner {
  name: string;
  logo: string;
  description: string;
  url: string;
  role: 'financial' | 'technical' | 'institutional' | 'partner';
}

const partners: Partner[] = [
  {
    name: 'NANKK Trust',
    logo: '/images/logos/logo-nannk.png',
    description: 'Partenaire financier principal',
    url: '#',
    role: 'financial'
  },
  {
    name: 'CDP',
    logo: '/images/logos/client-1.png',
    description: 'Partenaire institutionnel',
    url: '#',
    role: 'institutional'
  },
  {
    name: 'EFC',
    logo: '/images/logos/client-3.png',
    description: 'Partenaire stratégique',
    url: '#',
    role: 'partner'
  },
  {
    name: 'DEEC',
    logo: '/images/logos/client-6.png',
    description: 'Partenaire environnemental',
    url: '#',
    role: 'institutional'
  },
  {
    name: 'SANKOFA',
    logo: '/images/logos/client-9.webp',
    description: 'Partenaire culturel',
    url: '#',
    role: 'partner'
  },
  {
    name: 'Axiomtext.com',
    logo: '/images/logos/axiomtext.png',
    description: 'Partenaire technique',
    url: 'https://www.axiomtext.com/en',
    role: 'technical'
  },
];

const RoleIcon = ({ role }: { role: string }) => {
  switch (role) {
    case 'financial': return <Calculator className="w-4 h-4 text-gray-400" />;
    case 'technical': return <Globe className="w-4 h-4 text-gray-400" />;
    case 'institutional': return <Building2 className="w-4 h-4 text-gray-400" />;
    default: return <Briefcase className="w-4 h-4 text-gray-400" />;
  }
};

const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50/50 via-white to-green-50/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg mb-6 inline-flex items-center gap-3">
            🌿 NOS PARTENAIRES & RÉSEAUX
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-yellow-400 mx-auto rounded-full mb-8 opacity-80"></div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Ensemble, nous construisons un réseau solide pour maximiser notre impact environnemental et social.
          </p>
        </motion.div>

        {/* Partners Swiper */}
        <div className="mb-20">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1.5, centeredSlides: true },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }, // Fewer slides per view for more focus
              1280: { slidesPerView: 5 },
            }}
            className="!py-10 !px-4"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index} className="h-full">
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-green-50/50 p-8 flex flex-col items-center justify-between text-center transition-all duration-500 h-[280px] w-full relative">

                    {/* Badge for Principal Partners */}
                    {partner.role === 'financial' && (
                      <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded-full border border-yellow-200">
                        PRINCIPAL
                      </div>
                    )}

                    {/* Logo Section */}
                    <div className="flex-grow flex items-center justify-center w-full p-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img
                        src={partner.logo}
                        alt={`Logo ${partner.name}`}
                        className="max-h-24 max-w-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Info Section */}
                    <div className="w-full mt-4 pt-4 border-t border-gray-100 group-hover:border-green-100 transition-colors">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-green-700 transition-colors">{partner.name}</h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                        <RoleIcon role={partner.role} />
                        <span className="truncate max-w-[150px]">{partner.description}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Call to Action Premium - Compact & Integrated */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mt-20 rounded-[2.5rem] overflow-hidden shadow-xl ring-1 ring-green-100"
        >
          {/* Light Site Gradient Background + Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-white/40 to-emerald-50/80 backdrop-blur-sm"></div>

          {/* Very subtle noise/pattern for texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-black bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

          <div className="relative z-10 py-12 px-8 md:px-16 text-center flex flex-col items-center">

            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 tracking-tight uppercase">
              REJOIGNEZ NOTRE RÉSEAU <br className="hidden md:block" />
              DE PARTENAIRES D'<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 font-extrabold">IMPACT</span>
            </h3>

            <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Associez votre image à une cause noble et participez concrètement à la reforestation du Sahel.
            </p>

            {/* Integrated Premium Button */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                to="/devenir-partenaire"
                className="group inline-flex items-center gap-3 bg-white/60 hover:bg-white backdrop-blur-md text-green-800 border border-green-100 px-8 py-4 rounded-full font-bold text-lg shadow-[0_8px_20px_rgba(34,197,94,0.1)] hover:shadow-[0_12px_30px_rgba(34,197,94,0.15)] transition-all duration-300"
              >
                <Handshake className="w-5 h-5 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
                Devenir partenaire
              </Link>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Partners;
