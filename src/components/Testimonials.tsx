import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Leaf, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Grâce à Podor Vert, notre village a pu bénéficier de plants et d’une vraie formation en reboisement. Aujourd’hui, les jeunes sont engagés et motivés.",
    name: "Aïssatou Ndiaye",
    designation: "Membre bénévole",
    src: "/images/photo-avatar-profil.png",
  },
  {
    quote:
      "L’association nous a permis de mieux comprendre l’importance de la protection de l’environnement. Je suis fier d’y contribuer activement.",
    name: "Mamadou Ba",
    designation: "Enseignant à Podor",
    src: "/images/photo-avatar-profil.png",
  },
  {
    quote:
      "Podor Vert m’a donné l’opportunité de participer à des actions concrètes pour ma communauté. Planter un arbre aujourd’hui, c’est protéger demain.",
    name: "Fatou Sow",
    designation: "Jeune volontaire",
    src: "/images/photo-avatar-profil.png",
  },
  {
    quote:
      "Avec Podor Vert, nous avons appris à fabriquer des bio-pesticides naturels. Cela a réduit nos dépenses et protégé nos cultures.",
    name: "Oumar Sy",
    designation: "Agriculteur local",
    src: "/images/photo-avatar-profil.png",
  },
  {
    quote:
      "C’est une grande fierté de voir notre commune reverdir grâce aux initiatives de Podor Vert. L’impact est déjà visible.",
    name: "Aminata Diallo",
    designation: "Conseillère municipale",
    src: "/images/photo-avatar-profil.png",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-green-50/50 via-white to-green-50/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-100 blur-[100px] rounded-full opacity-30 pointer-events-none"></div>

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
            🌿 CE QU'ILS PENSENT DE PODOR VERT
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-yellow-400 mx-auto rounded-full mb-8 opacity-80"></div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Témoignages inspirants de ceux qui participent activement à la transformation écologique.
          </p>
        </motion.div>

        {/* Testimonials Grid / Slider */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-12 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index} // safe here as list is static
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[85vw] md:w-auto snap-center"
            >
              <div className="h-full bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-lg hover:shadow-2xl border border-white/60 p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 group relative">

                {/* Top Quote Icon */}
                <div className="absolute top-8 left-8">
                  <Quote className="w-10 h-10 text-green-100 fill-green-50 group-hover:text-green-200 transition-colors" />
                </div>

                {/* Watermark Leaf */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <Leaf className="w-24 h-24 text-green-600 rotate-12" />
                </div>

                <div className="relative z-10 flex flex-col h-full pt-8">
                  {/* Rating with Leaves */}
                  <div className="flex gap-1 mb-6 justify-center md:justify-start">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Leaf key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                    ))}
                  </div>

                  <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8 flex-grow italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto border-t border-green-50 pt-6">
                    <div className="relative">
                      {/* Avatar container */}
                      <div className="p-1 rounded-full bg-gradient-to-br from-green-100 to-white shadow-sm group-hover:shadow-md transition-shadow">
                        <img
                          src={testimonial.src}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-500 fill-white" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-green-700 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-green-600 font-medium">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Indication */}
        <div className="md:hidden flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-green-600"></div>
          <div className="w-2 h-2 rounded-full bg-green-200"></div>
          <div className="w-2 h-2 rounded-full bg-green-200"></div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
