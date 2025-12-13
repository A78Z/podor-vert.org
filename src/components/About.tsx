import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const cards = [
    {
      image: '/images/gallery/Notre-Mission.png',
      title: 'Notre Mission',
      description: 'Contribuer significativement à la reforestation et à la lutte contre les changements climatiques.',
    },
    {
      image: '/images/gallery/Notre-Vision.png',
      title: 'Notre Vision',
      description: 'Faire de Podor un département vert, en harmonie avec son environnement.',
    },
    {
      image: '/images/gallery/nos-valeur.png',
      title: 'Nos Valeurs',
      description: 'Innovation, adaptabilité et transparence guident toutes nos actions.',
    },
    {
      image: '/images/gallery/reboiser.png',
      title: 'Reboiser',
      description: 'Mobiliser les jeunes et étudiants pour reboiser les villages et assurer le suivi des plants.',
    },
    {
      image: '/images/sensibiliser-former.png',
      title: 'Sensibiliser et Former',
      description: 'Organiser des ateliers, formations et journées thématiques pour renforcer la conscience écologique.',
    },
    {
      image: '/images/gallery/parrainage.png',
      title: 'Parrainage',
      description: 'Chaque bénévole parraine un élève pour suivre et entretenir plusieurs plants attribués.',
    },
  ];

  return (
    <section id="qui-sommes-nous" className="relative py-24 bg-gradient-to-b from-green-50/50 to-white overflow-hidden">
      {/* Decorative Background Elements similar to Activities 2025 */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* Title with premium styling */}
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg mb-6 inline-flex items-center gap-3">
            🌱 PODOR VERT
          </h2>

          {/* Green decorative line */}
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mb-8 opacity-80"></div>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Une association de jeunes volontaires engagés pour la protection de l’environnement et le reboisement dans le département de Podor.
          </p>

          {/* Leadership Section - Horizontal Alignment Forced */}
          <div className="mt-16 mb-20 flex flex-col md:flex-row justify-center items-start gap-12 md:gap-24 max-w-4xl mx-auto flex-nowrap">

            {/* President Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center flex-1 w-full"
            >
              <div className="relative w-32 h-32 mx-auto mb-5 p-[4px] rounded-full bg-gradient-to-br from-green-500 to-yellow-500 shadow-[0_10px_30px_rgba(34,197,94,0.35)] hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/bassirou-hamedine-sy.jpeg"
                  alt="Bassirou Hamedine SY"
                  className="w-full h-full rounded-full object-cover bg-white ring-2 ring-white"
                />
                <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-md pointer-events-none"></div>
              </div>
              <h3 className="text-xl font-bold text-green-900 tracking-tight">Bassirou Hamedine SY</h3>
              <p className="text-sm text-gray-600 font-medium mt-2 leading-snug">Président & Membre Fondateur<br />Podor Vert</p>
            </motion.div>

            {/* Parrain Spirituel Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-center flex-1 w-full"
            >
              <div className="relative w-32 h-32 mx-auto mb-5 p-[4px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/baaba-maal.jpg"
                  alt="Baaba Maal"
                  className="w-full h-full rounded-full object-cover bg-white ring-2 ring-white"
                />
                <div className="absolute inset-0 rounded-full bg-indigo-400 opacity-20 blur-md pointer-events-none"></div>
              </div>
              <h3 className="text-xl font-bold text-indigo-900 tracking-tight">Baaba Maal</h3>
              <p className="text-sm text-gray-600 font-medium mt-2 leading-snug">Parrain Spirituel &<br />Ambassadeur Universel</p>
            </motion.div>

          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="relative h-full bg-white p-2 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-50/50">
                {/* Image Container with Overlay */}
                <div className="relative overflow-hidden rounded-[2rem] h-64 mb-6 group-hover:shadow-lg transition-shadow duration-500">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                  {/* Optional Badge if needed, for instance on "Reboiser" */}
                  {['Reboiser', 'Sensibiliser et Former', 'Parrainage'].includes(card.title) && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Action
                      </span>
                    </div>
                  )}
                </div>

                <div className="px-6 pb-8">
                  {/* Green Leaf Icon */}
                  <div className="flex justify-center mb-4">
                    <span className="text-2xl">🌱</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors duration-300">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-base font-medium">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
