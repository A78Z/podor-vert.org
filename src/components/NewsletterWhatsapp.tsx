import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Send, ShieldCheck } from "lucide-react";
import { Parse } from '../lib/parseClient';

const NewsletterWhatsapp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if email already exists
      const query = new Parse.Query('Newsletter');
      query.equalTo('email', email);
      const existing = await query.first();

      if (existing) {
        alert('Cet email est déjà inscrit à notre newsletter.');
        setIsSubmitting(false);
        return;
      }

      const subscriber = new Parse.Object('Newsletter');
      subscriber.set('email', email);
      await subscriber.save();

      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "221774031305";
  const whatsappMessage =
    "Bonjour, je veux recevoir les alertes de reboisement et les résultats des missions terrain";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-md flex items-center justify-center gap-4">
              <span className="text-4xl md:text-5xl">📢</span>
              ABONNEZ-VOUS À NOTRE NEWSLETTER
            </h2>
          </motion.div>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto font-medium">
            Recevez en avant-première nos actualités 🌱, les campagnes de
            reboisement 🌳 et les résultats de nos missions sur le terrain 📊, directement dans votre boîte mail.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            className="bg-green-50 border border-green-200 rounded-[2rem] py-8 px-10 inline-block shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <p className="text-green-700 font-bold text-2xl mb-2">✅ Inscription confirmée !</p>
            <p className="text-green-600">Merci de rejoindre notre communauté d'impact.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-3 md:p-4 max-w-2xl mx-auto ring-1 ring-gray-100 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-shadow duration-500"
          >
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Votre adresse email professionnelle"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:bg-white focus:border-green-400 focus:ring-0 transition-all duration-300 text-gray-800 placeholder-gray-400 text-lg shadow-inner outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-[1.5rem] transition-all transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[200px]"
            >
              {isSubmitting ? (
                'Inscription...'
              ) : (
                <>
                  S'inscrire <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.form>
        )}

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400 font-medium"
        >
          <ShieldCheck className="w-4 h-4 text-green-500" /> Pas de spam • Désinscription à tout moment
        </motion.div>

      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-200/40 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-green-200/40 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl z-50"
        title="Recevoir les alertes WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 12 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <MessageCircle size={30} />
      </motion.a>
    </section>
  );
};

export default NewsletterWhatsapp;
