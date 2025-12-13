import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, TreePine, GraduationCap, Users, X, User as UserIcon, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type DonationOption = {
  id: number;
  amount: number;
  label: string;
  description: string;
  icon: React.ElementType;
};

const donationOptions: DonationOption[] = [
  {
    id: 1,
    amount: 3250,
    label: "Planter un arbre",
    description: "Financez la plantation et l'entretien d'un arbre pendant 3 ans",
    icon: TreePine,
  },
  {
    id: 2,
    amount: 32500,
    label: "Parrainer un élève",
    description: "Soutenez la scolarité d'un enfant pendant un mois",
    icon: GraduationCap,
  },
  {
    id: 3,
    amount: 130000,
    label: "Formation complète",
    description: "Financez une session de formation pour 10 personnes",
    icon: Users,
  },
];

const Donation: React.FC = () => {
  const [selectedDonation, setSelectedDonation] = useState<DonationOption | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'orange' | null>(null);

  const handleSelectDonation = (donation: DonationOption) => {
    setSelectedDonation(donation);
    setPaymentMethod(null);
  };

  const handleCloseModal = () => {
    setSelectedDonation(null);
    setPaymentMethod(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`🚧 Le service de paiement via ${paymentMethod === 'wave' ? 'Wave' : 'Orange Money'} sera bientôt disponible.`);
    handleCloseModal();
  };

  return (
    <section id="donation" className="relative py-24 bg-gradient-to-b from-green-50/50 via-white to-green-50/30 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-50"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-200/30 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-yellow-100/40 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Floating Heart Badge */}
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 bg-green-400 blur-lg opacity-20 rounded-full animate-pulse"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-green-200 border-2 border-white ring-4 ring-green-50">
              <Heart className="w-8 h-8 text-white fill-current animate-pulse duration-[3000ms]" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg mb-6 tracking-tight">
            SOUTENEZ NOS ACTIONS
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-yellow-400 mx-auto rounded-full mb-8 opacity-80"></div>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Votre contribution, quelle qu'elle soit, nous aide à poursuivre notre mission pour un environnement plus vert et une éducation accessible à tous.
          </p>
        </motion.div>

        {/* Options de dons */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {donationOptions.map((donation, index) => (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl hover:shadow-2xl border border-white/50 p-10 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              {/* Icon Circle */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center mb-6 shadow-inner relative group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 rounded-full border border-green-100 opacity-50"></div>
                <donation.icon className="w-10 h-10 text-green-600 group-hover:text-green-700 transition-colors" />
              </div>

              {/* Amount */}
              <div className="text-4xl font-extrabold text-green-700 mb-2 tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform">
                {donation.amount.toLocaleString("fr-FR")} <span className="text-lg text-green-600/70 align-top">FCFA</span>
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold text-gray-800 mb-4">{donation.label}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-[250px]">
                {donation.description}
              </p>

              {/* Button */}
              <button
                onClick={() => handleSelectDonation(donation)}
                className="mt-auto px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-full font-bold shadow-lg shadow-green-200 hover:shadow-green-300 transition-all duration-300 transform group-hover:scale-105 w-full flex items-center justify-center gap-2"
              >
                Choisir ce don
                <Heart className="w-4 h-4 fill-current opacity-80" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal - Keeping existing modal logic but updating style slightly */}
      <AnimatePresence>
        {selectedDonation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-[2rem] shadow-2xl p-10 max-w-md w-full mx-4 relative border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors bg-gray-100 rounded-full p-2"
                aria-label="Fermer la modale"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!paymentMethod ? (
                  <motion.div
                    key="payment-selection"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-8 h-8 text-green-600 fill-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                      Moyen de paiement
                    </h3>
                    <p className="text-gray-500 mb-8 text-center text-sm">
                      Don pour : <span className="font-bold text-green-700">{selectedDonation.label}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => setPaymentMethod("wave")} className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all group">
                        <img src="/images/logos/wave-logo.png" alt="Payer avec Wave" className="h-12 object-contain mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-gray-700 text-sm">Wave</span>
                      </button>
                      <button onClick={() => setPaymentMethod("orange")} className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-2xl hover:border-orange-400 hover:bg-orange-50 transition-all group">
                        <img src="/images/logos/orange-money-logo.png" alt="Payer avec Orange Money" className="h-12 object-contain mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-gray-700 text-sm">Orange Money</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm" onClick={() => setPaymentMethod(null)}>←</span>
                      Via {paymentMethod === "wave" ? "Wave" : "Orange Money"}
                    </h3>
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div>
                        <label className="block text-gray-700 font-bold text-sm mb-2">Nom complet</label>
                        <div className="relative">
                          <UserIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" />
                          <input type="text" className="w-full bg-gray-50 border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="Votre nom" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold text-sm mb-2">Montant (FCFA)</label>
                        <div className="relative">
                          <span className="text-gray-500 absolute top-1/2 left-4 -translate-y-1/2 font-bold text-sm">CFA</span>
                          <input type="number" defaultValue={selectedDonation.amount} className="w-full bg-gray-50 border-gray-200 rounded-xl pl-14 pr-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-mono font-bold text-green-700" required />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={cn(
                          "w-full flex items-center justify-center text-white py-4 rounded-xl font-bold shadow-lg transition-transform transform hover:scale-[1.02] mt-4",
                          paymentMethod === 'wave'
                            ? 'bg-[#1E90FF] hover:bg-[#187bcd] shadow-blue-200'
                            : 'bg-[#FF6600] hover:bg-[#e65c00] shadow-orange-200'
                        )}
                      >
                        Envoyer le paiement
                        <Send className="w-5 h-5 ml-2" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Donation;
