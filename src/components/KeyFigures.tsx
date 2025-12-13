import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { TreePine, GraduationCap, Users, Award } from 'lucide-react';

// Define the structure for each figure
interface Figure {
  icon: React.ElementType;
  end: number;
  suffix: string;
  label: string;
  color: string;
  bgColor: string;
  progressColor: string;
}

const figures: Figure[] = [
  {
    icon: TreePine,
    end: 15000,
    suffix: '+',
    label: 'Arbres plantés',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    progressColor: 'bg-gradient-to-r from-green-400 to-emerald-600'
  },
  {
    icon: GraduationCap,
    end: 250,
    suffix: '+',
    label: 'Élèves parrainés',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    progressColor: 'bg-gradient-to-r from-blue-400 to-indigo-600'
  },
  {
    icon: Users,
    end: 120,
    suffix: '+',
    label: 'Sessions de formation',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    progressColor: 'bg-gradient-to-r from-emerald-500 to-teal-700'
  },
  {
    icon: Award,
    end: 8,
    suffix: '+',
    label: 'Partenaires actifs',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    progressColor: 'bg-gradient-to-r from-yellow-400 to-orange-500'
  }
];

const KeyFigures: React.FC = () => {
  return (
    <section id="objectifs" className="relative py-24 bg-gradient-to-b from-green-50/50 via-white to-green-50/30 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Header with Premium Styling */}
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg mb-6 inline-flex items-center gap-3">
            🌿 NOS RÉALISATIONS EN CHIFFRES 🌿
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-yellow-400 mx-auto rounded-full mb-8 opacity-80"></div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Découvrez l’impact concret de nos actions sur le terrain depuis notre création.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {figures.map((figure, index) => (
            <motion.div
              key={figure.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              }}
              className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl p-8 flex flex-col items-center text-center border border-white/60 relative overflow-hidden group hover:border-green-200 transition-colors"
            >
              {/* Animated Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-50 via-transparent to-white opacity-0 group-hover:opacity-100 transition duration-700"></div>

              {/* Floating Icon with Halo */}
              <motion.div
                className={`flex items-center justify-center w-24 h-24 rounded-full ${figure.bgColor} shadow-inner mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1, transition: { type: 'spring', stiffness: 200, damping: 10, delay: index * 0.2 + 0.2 } }}
                viewport={{ once: true }}
              >
                <div className={`absolute inset-0 rounded-full ${figure.color} opacity-20 blur-md`}></div>
                <figure.icon className={`w-10 h-10 ${figure.color}`} />
              </motion.div>

              {/* Number with Counter */}
              <div className={`text-5xl font-extrabold ${figure.color} relative z-10 mb-2 drop-shadow-sm`}>
                <CountUp end={figure.end} duration={3} separator=" " enableScrollSpy scrollSpyOnce />
                <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                  {figure.suffix}
                </span>
              </div>

              <p className="text-gray-600 mt-2 font-bold text-lg relative z-10 tracking-wide uppercase text-sm">
                {figure.label}
              </p>

              {/* Breathing Progress Bar */}
              <div className="w-full bg-gray-100 h-2 rounded-full mt-8 overflow-hidden relative z-10 shadow-inner">
                <motion.div
                  className={`${figure.progressColor} h-2 rounded-full shadow-sm`}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeOut', delay: 0.4 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFigures;
