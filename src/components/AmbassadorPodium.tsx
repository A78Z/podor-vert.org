import React from "react";
import { motion } from "framer-motion";
import { Medal, Crown, Star } from "lucide-react";

interface Ambassadeur {
  id: number;
  nom: string;
  image: string;
  arbres: number;
}

// Data is sorted for podium display: #2, #1, #3
const topDuMois: Ambassadeur[] = [
  { id: 2, nom: "Ibrahima Djigo", image: "/images/Ibrahima-Djigo.jpeg", arbres: 110 },
  { id: 1, nom: "Pathé Hanne", image: "/images/Pathe-Hanne.jpeg", arbres: 120 },
  { id: 3, nom: "AMADOU DIALLO", image: "/images/Amadou-Diallo.jpeg", arbres: 95 },
];

const AmbassadorPodium: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-50/50 via-white to-green-50/30 py-24 overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating Medal Badge */}
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-20 rounded-full animate-pulse"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl shadow-yellow-200 border-2 border-white ring-4 ring-yellow-50">
              <Medal className="w-8 h-8 text-white fill-current animate-[pulse_3s_infinite]" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-700 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg mb-6">
            Top Ambassadeurs du Mois
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-yellow-500 mx-auto rounded-full opacity-80 mb-4"></div>

          <p className="text-gray-500 font-medium">
            Février 2025
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-10 perspective-1000">
          {/* #2 Ambassadeur (Silver) */}
          <motion.div
            className="order-2 md:order-1 flex flex-col items-center bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all w-full md:w-80 border border-slate-100 relative group"
            initial={{ opacity: 0, y: 50, x: -20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-600 font-bold px-4 py-1 rounded-full text-sm shadow-sm border border-white">
              #2
            </div>

            <div className="relative mt-2 mb-4 group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 rounded-full bg-slate-200 blur-md opacity-0 group-hover:opacity-60 transition-opacity"></div>
              <img
                src={topDuMois[0].image}
                alt={topDuMois[0].nom}
                className="relative w-28 h-28 object-cover rounded-full border-4 border-slate-300 shadow-lg group-hover:border-slate-400 transition-colors"
              />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-1">{topDuMois[0].nom}</h3>
            <p className="text-green-600 font-extrabold text-lg flex items-center gap-1">
              {topDuMois[0].arbres.toLocaleString()} <span className="text-xl">🌱</span>
            </p>
          </motion.div>

          {/* #1 Ambassadeur (Gold) - En premier visuellement sur mobile, au milieu sur desktop */}
          <motion.div
            className="order-1 md:order-2 flex flex-col items-center bg-white/90 backdrop-blur-xl rounded-[3rem] p-10 shadow-2xl hover:shadow-[0_20px_50px_rgba(234,179,8,0.2)] transition-all z-20 w-full md:w-96 border border-yellow-100 relative group -translate-y-4 md:-translate-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -40 }} // Increased lift just for the winner
            transition={{ duration: 0.8, type: "spring" }}
          >
            {/* Crown Animation */}
            <motion.div
              className="absolute -top-10 text-yellow-500"
              animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Crown className="w-10 h-10 fill-yellow-400 drop-shadow-md" />
            </motion.div>

            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-extrabold px-6 py-1.5 rounded-full text-lg shadow-lg border-2 border-white">
              #1
            </div>

            <div className="relative mt-4 mb-6 group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 rounded-full bg-yellow-400 blur-xl opacity-20 group-hover:opacity-40 animate-pulse"></div>
              <img
                src={topDuMois[1].image}
                alt={topDuMois[1].nom}
                className="relative w-36 h-36 object-cover rounded-full border-4 border-yellow-400 shadow-2xl group-hover:border-yellow-300 transition-colors"
              />
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1.5 border-2 border-white shadow-sm">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
            </div>

            <h3 className="font-extrabold text-2xl text-gray-900 mb-2">{topDuMois[1].nom}</h3>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 font-black text-2xl flex items-center gap-2">
              {topDuMois[1].arbres.toLocaleString()} <span className="text-3xl filter drop-shadow-sm">🌱</span>
            </p>
          </motion.div>

          {/* #3 Ambassadeur (Bronze) */}
          <motion.div
            className="order-3 flex flex-col items-center bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all w-full md:w-80 border border-orange-50 relative group"
            initial={{ opacity: 0, y: 50, x: 20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-700 font-bold px-4 py-1 rounded-full text-sm shadow-sm border border-white">
              #3
            </div>

            <div className="relative mt-2 mb-4 group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 rounded-full bg-orange-300 blur-md opacity-0 group-hover:opacity-60 transition-opacity"></div>
              <img
                src={topDuMois[2].image}
                alt={topDuMois[2].nom}
                className="relative w-28 h-28 object-cover rounded-full border-4 border-orange-300 shadow-lg group-hover:border-orange-400 transition-colors"
              />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-1">{topDuMois[2].nom}</h3>
            <p className="text-green-600 font-extrabold text-lg flex items-center gap-1">
              {topDuMois[2].arbres.toLocaleString()} <span className="text-xl">🌱</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AmbassadorPodium;
