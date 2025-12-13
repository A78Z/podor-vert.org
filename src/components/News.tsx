import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Data Imports ---
import { newsList } from '../data/newsData';

// --- Video Data ---
interface Video {
  title: string;
  thumbnail: string;
  youtubeId: string;
  duration: string;
  views: string;
}

const videosData: Video[] = [
  {
    title: 'Intervention du Président de Podor Vert, M. Bassirou Hamedine Sy à la journée de l’arbre',
    thumbnail: '/images/blog/podorvertmbolo-biran.png',
    youtubeId: 'Ncm8vbyD2Fo',
    duration: '3:45',
    views: '1.5K',
  },
  {
    title: 'Discours lors de la Journée de Reboisement organisée par le Maire Oumar Baaba Ba',
    thumbnail: '/images/blog/discours-prsident-podorvert.png',
    youtubeId: 'Ncm8vbyD2Fo',
    duration: '3:45',
    views: '1.7K',
  },
  {
    title: 'Découvrez les Réalisations de PODOR VERT : Un Reportage Inspirant',
    thumbnail: '/images/blog/Visite-bio-ong-mbacke.jpg',
    youtubeId: 'QZi4RCKuOdo',
    duration: '3:45',
    views: '2.5K',
  },
  {
    title: 'À la rencontre de Podor Vert 🌿 | Épisode 1 – Kora Digital Solutions',
    thumbnail: '/images/gallery/54.png',
    youtubeId: 'pyvxriS5-gs',
    duration: '5:20',
    views: '5.8K',
  },
];

// --- Video Card Component ---
const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-t-[1.5rem]"
          ></iframe>
        ) : (
          <div
            className="relative h-full cursor-pointer overflow-hidden"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-white/40 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white fill-current ml-1" />
              </div>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {video.duration}
            </div>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2 leading-tight">
          {video.title}
        </h4>
        <p className="text-sm text-gray-500 mt-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          {video.views} vues
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---
const News: React.FC = () => {
  // Select specific articles
  const featuredArticle = newsList.find(a => a.id === 10);
  const gridArticles = newsList.filter(a => [9, 8].includes(a.id));

  return (
    <section id="actualites" className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Title with Premium Styling */}
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg mb-6 inline-flex items-center gap-3">
            <span className="text-4xl">📰</span> ACTUALITÉS
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-yellow-400 mx-auto rounded-full mb-8 opacity-80"></div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Suivez nos dernières actions et découvrez l'impact de nos interventions sur le terrain.
          </p>
        </motion.div>

        {/* Featured Article Section */}
        {featuredArticle && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-green-600 rounded-full"></span>
                À la Une
              </h3>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] group border border-gray-100"
            >
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <div className="inline-flex items-center gap-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-lg shrink-0">
                  <Calendar className="w-3 h-3" />
                  {featuredArticle.date}
                </div>
                <h3 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg max-w-4xl">
                  {featuredArticle.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-200 line-clamp-2 mb-8 max-w-2xl font-medium">
                  {featuredArticle.description}
                </p>
                <Link
                  to={featuredArticle.link}
                  className="inline-flex items-center gap-3 bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-base"
                >
                  Lire l'article complet <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}

        {/* Other News Grid */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span>
              Récemment
            </h3>
            <Link to="/actualites" className="hidden md:flex items-center gap-2 text-green-700 font-bold hover:underline">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {gridArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow relative bg-warm-white">
                  {/* Subtle Green Overlay on text part hover */}
                  <div className="absolute inset-0 bg-green-50/0 group-hover:bg-green-50/30 transition-colors duration-500 pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center text-xs font-bold text-green-600 mb-3 uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 mr-2" />
                      {article.date}
                    </div>

                    <h4 className="text-xl font-extrabold text-gray-900 mb-4 group-hover:text-green-700 transition-colors leading-tight line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3">
                      {article.description}
                    </p>

                    <div className="mt-auto">
                      <Link
                        to={article.link}
                        className="inline-flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all transform hover:translate-x-1 text-sm group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600"
                      >
                        Lire la suite <ArrowRight className="w-4 h-4 group-hover:animate-pulse" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>

        {/* Vidéos Section */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-3xl">🎬</span>
              Nos Vidéos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videosData.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="https://www.youtube.com/@podorvert/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-gray-800 border-2 border-gray-200 px-8 py-3.5 rounded-full font-bold shadow-lg hover:border-green-500 hover:text-green-600 hover:shadow-xl transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current" />
              Découvrir notre chaîne YouTube
            </a>
          </div>
        </div>
      </div>
    </section >
  );
};

export default News;
