import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Music, Sprout, Users, Globe, Heart } from 'lucide-react';

const BluesDuFleuve2025Page: React.FC = () => {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <img
                    src="/images/news/blues-du-fleuve-2025-v2.jpg"
                    alt="Festival Les Blues du Fleuve 2025"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-black/50 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end items-center text-center text-white pb-16 md:pb-24 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-yellow-400 text-green-900 font-bold text-sm tracking-widest uppercase shadow-lg">
                            Actualité Majeure
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold max-w-5xl leading-tight drop-shadow-2xl mx-auto mb-6">
                            Podor Vert au cœur du Festival<br />
                            <span className="text-yellow-400">Les Blues du Fleuve 2025</span>
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-green-50 text-sm md:text-base font-medium">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <Calendar size={18} className="text-yellow-400" />
                                <span>08 décembre 2025</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <MapPin size={18} className="text-yellow-400" />
                                <span>Podor – Île à Morphil</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Intro */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        >
                            <h2 className="text-3xl font-bold text-green-800 mb-6">
                                Cinq années d’impact célébrées dans un cadre symbolique
                            </h2>
                            <p className="text-xl text-gray-600 border-l-4 border-yellow-400 pl-6 italic mb-8">
                                Les <strong>05, 06 et 07 décembre 2025</strong>, l’association Podor Vert a vécu un moment fort de son histoire à l’occasion de la <strong>17ᵉ édition du festival Les Blues du Fleuve</strong>, initié par Baaba Maal.
                            </p>
                            <p>
                                Placée sous le thème <em>« Santé des populations, Emploi vert et Développement durable »</em>, cette édition a offert une tribune exceptionnelle pour mettre en lumière cinq années d’actions concrètes au service de l’environnement et des communautés locales.
                            </p>
                        </motion.div>

                        {/* Impact Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                            {[
                                { icon: Music, title: "Festival", desc: "Une présence remarquée au cœur de l'événement culturel majeur du Sahel." },
                                { icon: Sprout, title: "Reboisement", desc: "Présentation des résultats concrets de nos campagnes de plantation." },
                                { icon: Users, title: "Jeunesse", desc: "Rencontre inspirante avec les élèves de l'école de Petel Diéguéss." },
                                { icon: Globe, title: "Impact", desc: "Des initiatives locales qui changent durablement le territoire." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm mb-4">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-lg text-green-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-10 text-gray-700 leading-relaxed">
                            <section>
                                <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-yellow-400 rounded-full"></span>
                                    Des visites de terrain : l'impact prend racine
                                </h3>
                                <p>
                                    À la suite du festival, plusieurs visites ont permis de constater l'évolution des projets sur le terrain, notamment à la <strong>pépinière de Thioubalel</strong> sur l’Île à Morphil et celle de <strong>Belel Kellé</strong> dans le Dieri. Ces moments ont confirmé l'appropriation progressive des initiatives par les bénéficiaires locaux.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-yellow-400 rounded-full"></span>
                                    La jeunesse au cœur du changement
                                </h3>
                                <p>
                                    Un temps fort a été consacré à la rencontre avec les jeunes de l’école de <strong>Petel Diéguéss</strong>. Engagés et formés, ils ont réussi à créer leur propre espace vert. C'est la preuve vivante que l’éducation environnementale transforme durablement les comportements.
                                </p>
                            </section>
                        </div>

                        {/* Gallery Section */}
                        <div className="bg-gray-50 rounded-3xl p-8 my-12">
                            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Retour en images</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96">
                                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg relative group">
                                    <img src="/images/baaba-maal.jpg" alt="Baaba Maal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <p className="text-white font-bold">Baaba Maal, initiateur du festival</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-md">
                                    <img src="/images/pepinieres/pep1.jpg" onError={(e) => e.currentTarget.src = '/images/gallery/pepi1.jpeg'} alt="Pépinière" className="w-full h-full object-cover" />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-md">
                                    <img src="/images/pepinieres/pep2.jpg" onError={(e) => e.currentTarget.src = '/images/gallery/pepi2.jpeg'} alt="Visite terrain" className="w-full h-full object-cover" />
                                </div>
                                <div className="col-span-2 rounded-2xl overflow-hidden shadow-md bg-green-800 flex items-center justify-center p-6 text-center">
                                    <p className="text-green-50 font-medium italic">"Des territoires qui bougent, des citoyens qui s'engagent."</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote Block */}
                        <blockquote className="relative bg-gradient-to-r from-green-900 to-green-800 text-white p-10 rounded-3xl shadow-xl text-center my-12 overflow-hidden">
                            <div className="absolute top-0 left-0 text-9xl text-white opacity-5 font-serif transform -translate-y-8 -translate-x-4">"</div>
                            <p className="text-xl md:text-2xl font-medium relative z-10 italic">
                                Ce week-end a confirmé une conviction forte : le changement est déjà en marche à Podor, porté par des femmes, des hommes et des jeunes déterminés.
                            </p>
                            <footer className="mt-6 text-green-300 font-bold uppercase tracking-wider text-sm relative z-10">
                                — L'équipe Podor Vert
                            </footer>
                        </blockquote>

                        {/* Conclusion */}
                        <div className="text-center space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">Ensemble, continuons la dynamique 🚀</h3>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Podor Vert remercie chaleureusement ses bénévoles, partenaires et les communautés locales pour ce parcours mené avec courage et passion.
                            </p>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Action Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-32">
                            <div className="flex justify-center mb-6">
                                <div className="p-4 bg-green-50 rounded-full text-green-600">
                                    <Heart size={32} fill="currentColor" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Soutenir nos actions</h3>
                            <p className="text-center text-gray-500 text-sm mb-6">
                                Aidez-nous à pérenniser ces initiatives et à étendre notre impact dans le département.
                            </p>

                            <Link to="/devenir-donateur" className="block w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-green-950 font-bold py-4 rounded-xl text-center shadow-lg transition-all transform hover:scale-[1.02] mb-4">
                                Faire un don
                            </Link>
                            <Link to="/actualites" className="block w-full bg-white border-2 border-green-100 text-green-700 font-bold py-4 rounded-xl text-center hover:bg-green-50 transition-colors">
                                Voir toutes les actualités
                            </Link>
                        </div>

                        {/* Newsletter Mini */}
                        <div className="bg-green-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-12 -translate-y-12"></div>
                            <h4 className="font-bold text-lg mb-2 relative z-10">Restez informé</h4>
                            <p className="text-green-200 text-sm mb-4 relative z-10">Recevez nos dernières nouvelles directement.</p>
                            <form className="relative z-10">
                                <input type="email" placeholder="Votre email" className="w-full px-4 py-3 rounded-lg bg-green-800 border border-green-700 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-3" />
                                <button className="w-full bg-white text-green-900 font-bold py-2 rounded-lg hover:bg-green-50 transition-colors">S'inscrire</button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default BluesDuFleuve2025Page;
