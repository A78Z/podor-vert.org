import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LucideIcon, User, Briefcase, Phone, MapPin, Camera, Upload, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Parse } from '../lib/parseClient';

interface NavItem {
  name: string;
  to: string;
  icon: LucideIcon;
}

interface AutoHidingNavbarProps {
  items: NavItem[];
}

const AutoHidingNavbar: React.FC<AutoHidingNavbarProps> = ({ items }) => {
  const [isHidden, setIsHidden] = useState(false); // Initially visible
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMemberCardModalOpen, setIsMemberCardModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    function: "",
    phone: "",
    village: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastY = useRef(0);

  // Scroll behavior for "Premium" feel
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Determine "scrolled" state for visual condensation
      if (currentY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide only on distinct scroll down (after hero)
      if (currentY > lastY.current && currentY > 400) {
        setIsHidden(true);
      } else if (currentY < lastY.current || currentY < 100) {
        setIsHidden(false); // Show on scroll up
      }

      lastY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navContainerVariants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const commonLinkClasses = "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative group";

  // Premium Active/Inactive Link Styles
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      commonLinkClasses,
      isActive
        ? "bg-green-100 text-green-800 shadow-sm"
        : "text-gray-600 hover:text-green-700 hover:bg-green-50/50"
    );

  const handleMemberCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMemberCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoUrl = null;

      if (photoFile) {
        try {
          const parseFile = new Parse.File(photoFile.name, photoFile);
          await parseFile.save();
          photoUrl = parseFile.url();
        } catch (uploadError) {
          console.warn('Photo upload exception:', uploadError);
        }
      }

      const memberCard = new Parse.Object('MemberCard');
      memberCard.set('full_name', formData.fullname);
      memberCard.set('function', formData.function);
      memberCard.set('phone', formData.phone);
      memberCard.set('village', formData.village);
      memberCard.set('photo_url', photoUrl);
      memberCard.set('status', 'nouveau');

      await memberCard.save();

      const message = photoUrl
        ? "✅ Votre demande avec photo a bien été envoyée!"
        : "✅ Votre demande a bien été envoyée!";

      alert(message);
      setFormData({ fullname: "", function: "", phone: "", village: "" });
      setPhotoFile(null);
      setPhotoPreview(null);
      setIsMemberCardModalOpen(false);

      const fileInput = document.getElementById('header-photo-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      alert(`❌ Erreur: ${error?.message || 'Erreur inconnue'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hot zone to reveal nav on hover */}
      <div
        id="nav-hover-zone"
        className="fixed top-0 left-0 right-0 h-4 z-[1003]"
        onMouseEnter={() => setIsHidden(false)}
        aria-hidden="true"
      />

      {/* Navigation Bar Container */}
      <motion.header
        className="fixed top-0 inset-x-0 z-[1002] flex justify-center pt-4 pointer-events-none"
        variants={navContainerVariants}
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out border border-white/20 whitespace-nowrap",
            // Premium Styles: Glassmorphism, Pill Shape, Dynamic Sizing
            isScrolled
              ? "w-[95%] max-w-7xl py-2 px-4 bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 rounded-full"
              : "w-[95%] max-w-[1400px] py-4 px-8 bg-white/80 backdrop-blur-md shadow-md rounded-full mt-2"
          )}
        >
          {/* Brand/Logo - Text Removed */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative overflow-hidden rounded-full">
              <img
                src="/images/logo-podorvert.png"
                alt="Podor Vert Logo"
                className={cn(
                  "object-contain transition-all duration-500",
                  isScrolled ? "h-10 w-10" : "h-12 w-12"
                )}
              />
            </div>
            {/* TEXT REMOVED as requested */}
          </Link>

          {/* Desktop Links - Whitespace Nowrap & Adjusted Spacing */}
          <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0 flex-nowrap">
            {items.filter(i => i.name === 'ACCUEIL').map((item) => (
              <li key={item.name} className="shrink-0">
                <NavLink to={item.to} className={navLinkClass}>
                  {item.name}
                </NavLink>
              </li>
            ))}

            {/* Grouping other links cleanly */}
            <div className="h-6 w-px bg-gray-200 mx-2 shrink-0"></div>

            {items.filter(i => i.name !== 'ACCUEIL').map((item) => (
              <li key={item.name} className="shrink-0">
                <NavLink to={item.to} className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-[13px] font-medium transition-colors hover:text-green-700 relative group block", // block helps with transform
                    isActive ? "text-green-800 font-semibold" : "text-gray-600"
                  )
                }>
                  {item.name}
                  <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center opacity-70"></span>
                </NavLink>
              </li>
            ))}

            <li className="ml-2 shrink-0">
              <button
                onClick={() => setIsMemberCardModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold text-gray-700 border border-gray-200 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all duration-300"
              >
                <CreditCard className="w-3 h-3" />
                MA CARTE
              </button>
            </li>
          </ul>

          {/* Right Side: CTA & Mobile Menu */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Premium Donate Button */}
            <Link
              to="/devenir-donateur"
              className={cn(
                "hidden lg:inline-flex items-center justify-center font-bold text-white bg-green-600 rounded-full shadow-lg shadow-green-900/20 hover:shadow-green-900/40 hover:bg-green-500 hover:scale-105 active:scale-95 transition-all duration-300",
                isScrolled ? "px-5 py-2 text-sm" : "px-6 py-2.5 text-base"
              )}
            >
              DON
            </Link>

            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1004] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/favicon.png"
                      alt="Logo"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="font-bold text-green-900">PODOR VERT</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Fermer le menu"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Navigation</div>
                  {items.map((item) => (
                    <NavLink
                      key={`mobile-${item.name}`}
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                          isActive
                            ? "bg-green-50 text-green-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                        )
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className={cn("w-5 h-5", ({ isActive }: { isActive: boolean }) => isActive ? "text-green-600" : "text-gray-400")} />
                      {item.name}
                    </NavLink>
                  ))}

                  <div className="h-px bg-gray-100 my-4 mx-3"></div>

                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Espace Membre</div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMemberCardModalOpen(true);
                    }}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-green-600 w-full text-left"
                  >
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    Demande de Carte
                  </button>

                  <Link
                    to="/devenir-donateur"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-6 flex items-center justify-center gap-2 w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/10 active:scale-95 transition-all"
                  >
                    FAIRE UN DON
                  </Link>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Member Card Modal (Unchanged logic, just styling tweaks if needed, kept mostly same) */}
      <Dialog open={isMemberCardModalOpen} onOpenChange={setIsMemberCardModalOpen}>
        <DialogContent className="w-[95vw] max-w-md sm:max-w-lg max-h-[90vh] p-0 gap-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
          <div className="bg-white flex flex-col max-h-[90vh]">
            <div className="flex-shrink-0 px-6 py-5 bg-green-50/50 border-b border-green-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-800">
                  Ma Carte Membre
                </h2>
                <p className="text-sm text-green-600 mt-0.5">
                  Rejoignez la communauté officielle
                </p>
              </div>
              <button
                onClick={() => setIsMemberCardModalOpen(false)}
                className="p-2 bg-white hover:bg-green-100 rounded-full text-green-700 transition-colors shadow-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <form onSubmit={handleMemberCardSubmit} className="space-y-5">
                {/* Form Fields - Styled */}
                {[
                  { label: "Prénom et Nom", icon: User, name: "fullname", type: "text", placeholder: "Ex: Moussa Diop" },
                  { label: "Fonction", icon: Briefcase, name: "function", type: "text", placeholder: "Ex: Enseignant, Agriculteur..." },
                  { label: "Téléphone", icon: Phone, name: "phone", type: "tel", placeholder: "+221 77..." },
                  { label: "Village / Quartier", icon: MapPin, name: "village", type: "text", placeholder: "Votre localité" }
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      {field.label}
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <field.icon className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={(formData as any)[field.name]}
                        onChange={handleMemberCardChange}
                        required={field.name !== 'function'}
                        className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                      />
                    </div>
                  </div>
                ))}

                {/* Photo Upload Section */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                    Photo d'identité
                  </label>
                  <div className="relative">
                    <input
                      id="header-photo-input"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="header-photo-input"
                      className={cn(
                        "block w-full border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden relative group",
                        photoPreview ? "border-green-500/50 bg-green-50/30" : "border-gray-300 hover:border-green-400 hover:bg-green-50/30"
                      )}
                    >
                      {photoPreview ? (
                        <div className="relative w-full h-48 py-4">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm font-semibold flex items-center gap-2">
                              <Camera className="w-4 h-4" /> Changer la photo
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                          <div className="w-14 h-14 mb-3 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="h-7 w-7" />
                          </div>
                          <p className="text-sm font-semibold text-gray-700">Importer une photo</p>
                          <p className="text-xs text-gray-500 mt-1">Recommandé pour la carte</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-900/20 hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-4"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AutoHidingNavbar;
