import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Parse } from '../lib/parseClient';
import { Users, Mail, CreditCard, MessageSquare, Heart, HelpCircle, GraduationCap, Menu, X, Eye, Trash2, CheckCircle, Download, Image, LogOut } from 'lucide-react';
import MessageModal from '../components/MessageModal';

interface Partner { id: string; company: string; partner_type: string; name: string; email: string; phone: string; message: string; created_at: string; }
interface Newsletter { id: string; email: string; created_at: string; }
interface MemberCard { id: string; full_name: string; function: string; phone: string; village: string; photo_url: string | null; created_at: string; }
interface Contact { id: string; name: string; email: string; subject: string; message: string; status: string; created_at: string; }
interface SponsorMessage { id: string; name: string; locality: string; trees_count: number; message: string; status: string; created_at: string; }
interface QuizResponse { id: string; question: string; answer: string; is_correct: boolean; user_email: string; created_at: string; }
interface TopSchool { id: string; school_name: string; contact_name: string; email: string; phone: string; city: string; message: string; plants_count: number; is_published: boolean; created_at: string; }
interface PlantRequest { id: string; organization_name: string; groupment_type: string; responsible_name: string; email: string; phone: string; location: string; planned_date: string; quantity_requested: number; plant_species: string; activity_objective: string; additional_message?: string; status: string; created_at: string; }

type Section = 'partners' | 'newsletter' | 'member_cards' | 'contacts' | 'sponsor_messages' | 'quiz_responses' | 'top_schools' | 'plant_requests';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('partners');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [partners, setPartners] = useState<Partner[]>([]);
  const [newsletter, setNewsletter] = useState<Newsletter[]>([]);
  const [memberCards, setMemberCards] = useState<MemberCard[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [sponsorMessages, setSponsorMessages] = useState<SponsorMessage[]>([]);
  const [quizResponses, setQuizResponses] = useState<QuizResponse[]>([]);
  const [topSchools, setTopSchools] = useState<TopSchool[]>([]);
  const [plantRequests, setPlantRequests] = useState<PlantRequest[]>([]);

  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const sections = [
    { id: 'partners' as Section, label: 'Devenir partenaire', icon: Users, color: 'green' },
    { id: 'newsletter' as Section, label: 'Newsletter', icon: Mail, color: 'blue' },
    { id: 'member_cards' as Section, label: 'Carte Membre', icon: CreditCard, color: 'purple' },
    { id: 'contacts' as Section, label: 'Contact', icon: MessageSquare, color: 'orange' },
    { id: 'sponsor_messages' as Section, label: 'Messages des Parrains', icon: Heart, color: 'red' },
    { id: 'quiz_responses' as Section, label: 'Quiz CO₂', icon: HelpCircle, color: 'teal' },
    { id: 'top_schools' as Section, label: 'Top Écoles', icon: GraduationCap, color: 'indigo' },
    { id: 'plant_requests' as Section, label: 'Demandes Plants', icon: Image, color: 'pink' },
  ];

  const fetchData = async (section: Section) => {
    setLoading(true);
    try {
      switch (section) {
        case 'partners': {
          const query = new Parse.Query('Partner');
          query.descending('createdAt');
          const results = await query.find();
          const mapped = results.map(p => ({
            id: p.id,
            company: p.get('company'),
            partner_type: p.get('partner_type'),
            name: p.get('name'),
            email: p.get('email'),
            phone: p.get('phone'),
            message: p.get('message'),
            created_at: (p.createdAt || new Date()).toISOString()
          })) as Partner[];
          setPartners(mapped);
          break;
        }
        case 'newsletter': {
          const query = new Parse.Query('Newsletter');
          query.descending('createdAt');
          const results = await query.find();
          setNewsletter(results.map(n => ({ id: n.id, email: n.get('email'), created_at: (n.createdAt || new Date()).toISOString() })) as Newsletter[]);
          break;
        }
        case 'member_cards': {
          const query = new Parse.Query('MemberCard');
          query.descending('createdAt');
          const results = await query.find();
          setMemberCards(results.map(mc => ({
            id: mc.id,
            full_name: mc.get('full_name'),
            function: mc.get('function'),
            phone: mc.get('phone'),
            village: mc.get('village'),
            photo_url: mc.get('photo_url'),
            created_at: (mc.createdAt || new Date()).toISOString()
          })) as MemberCard[]);
          break;
        }
        case 'contacts': {
          const query = new Parse.Query('Contact');
          query.descending('createdAt');
          const results = await query.find();
          setContacts(results.map(c => ({
            id: c.id,
            name: c.get('name'),
            email: c.get('email'),
            subject: c.get('subject'),
            message: c.get('message'),
            status: c.get('status'),
            created_at: (c.createdAt || new Date()).toISOString()
          })) as Contact[]);
          break;
        }
        case 'sponsor_messages': {
          const query = new Parse.Query('SponsorMessage');
          query.descending('createdAt');
          const results = await query.find();
          setSponsorMessages(results.map(sm => ({
            id: sm.id,
            name: sm.get('name'),
            locality: sm.get('locality'),
            trees_count: sm.get('trees_count'),
            message: sm.get('message'),
            status: sm.get('status'),
            created_at: (sm.createdAt || new Date()).toISOString()
          })) as SponsorMessage[]);
          break;
        }
        case 'quiz_responses': {
          const query = new Parse.Query('QuizResponse');
          query.descending('createdAt');
          const results = await query.find();
          setQuizResponses(results.map(qr => ({
            id: qr.id,
            question: qr.get('question'),
            answer: qr.get('answer'),
            is_correct: qr.get('is_correct'),
            user_email: qr.get('user_email'),
            created_at: (qr.createdAt || new Date()).toISOString()
          })) as QuizResponse[]);
          break;
        }
        case 'top_schools': {
          const query = new Parse.Query('TopSchool');
          query.descending('createdAt');
          const results = await query.find();
          setTopSchools(results.map(ts => ({
            id: ts.id,
            school_name: ts.get('school_name'),
            contact_name: ts.get('contact_name'),
            email: ts.get('email'),
            phone: ts.get('phone'),
            city: ts.get('city'),
            message: ts.get('message'),
            plants_count: ts.get('plants_count'),
            is_published: ts.get('is_published') || false,
            created_at: (ts.createdAt || new Date()).toISOString()
          })) as TopSchool[]);
          break;
        }
        case 'plant_requests': {
          const query = new Parse.Query('PlantRequest');
          query.descending('createdAt');
          const results = await query.find();
          setPlantRequests(results.map(pr => ({
            id: pr.id,
            organization_name: pr.get('organization_name'),
            groupment_type: pr.get('groupment_type'),
            responsible_name: pr.get('responsible_name'),
            email: pr.get('email'),
            phone: pr.get('phone'),
            location: pr.get('location'),
            planned_date: pr.get('planned_date'),
            quantity_requested: pr.get('quantity_requested'),
            plant_species: pr.get('plant_species'),
            activity_objective: pr.get('activity_objective'),
            additional_message: pr.get('additional_message'),
            status: pr.get('status'),
            created_at: (pr.createdAt || new Date()).toISOString()
          })) as PlantRequest[]);
          break;
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeSection);
  }, [activeSection]);

  const handleViewMessage = (contact: Contact) => {
    setSelectedMessage(contact);
    setIsMessageModalOpen(true);
  };

  const handleMarkAsProcessed = async (contactId: string) => {
    try {
      const object = new Parse.Object('Contact');
      object.id = contactId;
      object.set('status', 'traité');
      await object.save();

      setContacts(contacts.map(c =>
        c.id === contactId ? { ...c, status: 'traité' } : c
      ));
    } catch (error) {
      console.error('Error updating contact status:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDeleteMessage = async (contactId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      const object = new Parse.Object('Contact');
      object.id = contactId;
      await object.destroy();

      setContacts(contacts.filter(c => c.id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Erreur lors de la suppression du message');
    }
  };

  const handlePublishSponsorMessage = async (messageId: string) => {
    try {
      const object = new Parse.Object('SponsorMessage');
      object.id = messageId;
      object.set('status', 'publié');
      await object.save();

      setSponsorMessages(sponsorMessages.map(m =>
        m.id === messageId ? { ...m, status: 'publié' } : m
      ));
    } catch (error) {
      console.error('Error publishing sponsor message:', error);
      alert('Erreur lors de la publication du message');
    }
  };

  const handleUnpublishSponsorMessage = async (messageId: string) => {
    try {
      const object = new Parse.Object('SponsorMessage');
      object.id = messageId;
      object.set('status', 'en_attente');
      await object.save();

      setSponsorMessages(sponsorMessages.map(m =>
        m.id === messageId ? { ...m, status: 'en_attente' } : m
      ));
    } catch (error) {
      console.error('Error unpublishing sponsor message:', error);
      alert('Erreur lors du changement de statut');
    }
  };

  const handleDeleteSponsorMessage = async (messageId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      const object = new Parse.Object('SponsorMessage');
      object.id = messageId;
      await object.destroy();

      setSponsorMessages(sponsorMessages.filter(m => m.id !== messageId));
    } catch (error) {
      console.error('Error deleting sponsor message:', error);
      alert('Erreur lors de la suppression du message');
    }
  };

  const handleDeletePartner = async (partnerId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return;

    try {
      const object = new Parse.Object('Partner');
      object.id = partnerId;
      await object.destroy();

      setPartners(partners.filter(p => p.id !== partnerId));
    } catch (error) {
      console.error('Error deleting partner:', error);
      alert('Erreur lors de la suppression du partenaire');
    }
  };

  const handleDeleteNewsletter = async (newsletterId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) return;

    try {
      const object = new Parse.Object('Newsletter');
      object.id = newsletterId;
      await object.destroy();

      setNewsletter(newsletter.filter(n => n.id !== newsletterId));
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      alert('Erreur lors de la suppression de l\'abonné');
    }
  };

  const handleDeleteMemberCard = async (cardId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette carte membre ?')) return;

    try {
      const object = new Parse.Object('MemberCard');
      object.id = cardId;
      await object.destroy();

      setMemberCards(memberCards.filter(c => c.id !== cardId));
    } catch (error) {
      console.error('Error deleting member card:', error);
      alert('Erreur lors de la suppression de la carte membre');
    }
  };

  const handleDeleteQuizResponse = async (responseId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réponse ?')) return;

    try {
      const object = new Parse.Object('QuizResponse');
      object.id = responseId;
      await object.destroy();

      setQuizResponses(quizResponses.filter(q => q.id !== responseId));
    } catch (error) {
      console.error('Error deleting quiz response:', error);
      alert('Erreur lors de la suppression de la réponse');
    }
  };

  const handleSendQuizResults = async (response: QuizResponse) => {
    if (!response.user_email) {
      alert("Aucun email associé à cette réponse.");
      return;
    }

    if (!confirm(`Envoyer les résultats du quiz à ${response.user_email} ?`)) return;

    try {
      const query = new Parse.Query('QuizResponse');
      query.equalTo('user_email', response.user_email);
      query.descending('createdAt');
      query.limit(4);
      const responses = await query.find();

      const results = responses.map(r => ({
        question: r.get('question'),
        answer: r.get('answer'),
        isCorrect: r.get('is_correct')
      }));

      const score = results.filter(r => r.isCorrect).length;

      // 2. Call Vercel API Endpoint
      const responseApi = await fetch('/api/quiz/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: response.user_email,
          score: score,
          total: results.length,
          results: results
        }),
      });

      const data = await responseApi.json();

      if (responseApi.ok) {
        alert(`✅ Résultats envoyés à ${response.user_email}`);
      } else {
        console.error('API Error:', data);
        alert(`Erreur: ${data.error?.message || 'Erreur d\'envoi'}`);
      }
    } catch (error) {
      console.error('Error sending results:', error);
      alert('Erreur lors de l\'envoi');
    }
  };

  const handleDeleteTopSchool = async (schoolId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette école ?')) return;

    try {
      const object = new Parse.Object('TopSchool');
      object.id = schoolId;
      await object.destroy();

      setTopSchools(topSchools.filter(s => s.id !== schoolId));
    } catch (error) {
      console.error('Error deleting top school:', error);
      alert('Erreur lors de la suppression de l\'école');
    }
  };

  const handleTogglePublishSchool = async (school: TopSchool) => {
    try {
      const object = new Parse.Object('TopSchool');
      object.id = school.id;
      const newStatus = !school.is_published;
      object.set('is_published', newStatus);
      await object.save();

      setTopSchools(topSchools.map(s =>
        s.id === school.id ? { ...s, is_published: newStatus } : s
      ));
    } catch (error) {
      console.error('Error toggling school publication:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDeletePlantRequest = async (requestId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return;

    try {
      const object = new Parse.Object('PlantRequest');
      object.id = requestId;
      await object.destroy();

      setPlantRequests(plantRequests.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Error deleting plant request:', error);
      alert('Erreur lors de la suppression de la demande');
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('Aucune donnée à exporter');
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(','));
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Erreur lors du téléchargement de l\'image');
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      try {
        await Parse.User.logOut();
      } catch (error) {
        console.error("Erreur Parse logout:", error);
      } finally {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
      }
    }
  };

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      );
    }

    switch (activeSection) {
      case 'partners':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nom de l'organisation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Type de partenaire</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nom et Prénom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Téléphone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date d'envoi</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partners.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      Aucune demande de partenariat pour le moment
                    </td>
                  </tr>
                ) : (
                  partners.map((partner) => (
                    <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{partner.company || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          {partner.partner_type || 'Entreprise'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{partner.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a href={`mailto:${partner.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {partner.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{partner.phone || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{partner.message || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(partner.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => exportToCSV([partner], 'partenaire')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePartner(partner.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'newsletter':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date d'inscription</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {newsletter.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      Aucun abonné pour le moment
                    </td>
                  </tr>
                ) : (
                  newsletter.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                        <a href={`mailto:${sub.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {sub.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(sub.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => exportToCSV([sub], 'newsletter')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteNewsletter(sub.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'member_cards':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Photo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Prénom et Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Fonction</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Téléphone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Village</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date d'envoi</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {memberCards.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Aucune demande de carte membre pour le moment
                    </td>
                  </tr>
                ) : (
                  memberCards.map((card) => (
                    <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {card.photo_url ? (
                          <a href={card.photo_url} target="_blank" rel="noopener noreferrer" className="block">
                            <img
                              src={card.photo_url}
                              alt={card.full_name}
                              className="w-20 h-20 object-cover rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-gray-200 hover:border-green-500 hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = '/images/photo-avatar-profil.png';
                              }}
                            />
                          </a>
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex flex-col items-center justify-center text-gray-400 shadow-inner border-2 border-gray-300">
                            <img
                              src="/images/photo-avatar-profil.png"
                              alt="Avatar par défaut"
                              className="w-20 h-20 object-cover rounded-full opacity-60"
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{card.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {card.function ? (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                            {card.function}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{card.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{card.village || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(card.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {card.photo_url && (
                            <>
                              <a
                                href={card.photo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Voir la photo"
                              >
                                <Eye className="w-5 h-5" />
                              </a>
                              <button
                                onClick={() => downloadImage(card.photo_url!, `photo_${card.full_name.replace(/\s+/g, '_')}.jpg`)}
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Télécharger la photo"
                              >
                                <Image className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => exportToCSV([card], 'carte_membre')}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Télécharger les données CSV"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMemberCard(card.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'contacts':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Sujet</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date d'envoi</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Aucun message de contact pour le moment
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {contact.status === 'traité' ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center w-fit">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Traité
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                            Nouveau
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{contact.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {contact.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{contact.subject || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {contact.message.length > 50 ? `${contact.message.substring(0, 50)}...` : contact.message}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewMessage(contact)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir le message complet"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {contact.status !== 'traité' && (
                            <button
                              onClick={() => handleMarkAsProcessed(contact.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Marquer comme traité"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMessage(contact.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'sponsor_messages':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Localité</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Arbres</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sponsorMessages.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Aucun message de parrain pour le moment
                    </td>
                  </tr>
                ) : (
                  sponsorMessages.map((sponsor) => (
                    <tr key={sponsor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {sponsor.status === 'publié' ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center w-fit">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Publié
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                            En attente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{sponsor.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {sponsor.locality ? (
                          <span className="flex items-center">
                            📍 {sponsor.locality}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {sponsor.trees_count && sponsor.trees_count > 0 ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center w-fit">
                            🌱 {sponsor.trees_count}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {sponsor.message ? (
                          sponsor.message.length > 50 ? `${sponsor.message.substring(0, 50)}...` : sponsor.message
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(sponsor.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {sponsor.status === 'publié' ? (
                            <button
                              onClick={() => handleUnpublishSponsorMessage(sponsor.id)}
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                              title="Retirer de la publication"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePublishSponsorMessage(sponsor.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Publier sur le site"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => exportToCSV([sponsor], 'parrain')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSponsorMessage(sponsor.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'quiz_responses':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Question</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Réponse</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Correcte</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quizResponses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Aucune réponse au quiz pour le moment
                    </td>
                  </tr>
                ) : (
                  quizResponses.map((quiz) => (
                    <tr key={quiz.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{quiz.question}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{quiz.answer}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${quiz.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {quiz.is_correct ? 'Oui' : 'Non'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{quiz.user_email || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(quiz.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => quiz.user_email && handleSendQuizResults(quiz)}
                            disabled={!quiz.user_email}
                            className={`p-2 rounded-lg transition-colors ${quiz.user_email
                              ? 'text-blue-600 hover:bg-blue-50 cursor-pointer'
                              : 'text-gray-300 cursor-not-allowed'
                              }`}
                            title={quiz.user_email ? "Envoyer les résultats par email" : "Pas d'email disponible"}
                          >
                            <Mail className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => exportToCSV([quiz], 'quiz_reponse')}
                            className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuizResponse(quiz.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'top_schools':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">École</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Téléphone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Ville</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topSchools.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      Aucune école inscrite pour le moment
                    </td>
                  </tr>
                ) : (
                  topSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{school.school_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{school.contact_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a href={`mailto:${school.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {school.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{school.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{school.city}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{school.message}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(school.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleTogglePublishSchool(school)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${school.is_published
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                          >
                            {school.is_published ? 'Publié' : 'Brouillon'}
                          </button>
                          <button
                            onClick={() => exportToCSV([school], 'ecole')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTopSchool(school.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      case 'plant_requests':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Organisation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Responsable</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Téléphone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Lieu</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date Prévue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Qté</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Espèces</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Objectif</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {plantRequests.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="px-6 py-8 text-center text-gray-500">
                      Aucune demande de plants pour le moment
                    </td>
                  </tr>
                ) : (
                  plantRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{request.organization_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-semibold">{request.groupment_type}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{request.responsible_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a href={`mailto:${request.email}`} className="text-blue-600 hover:text-blue-700 hover:underline">{request.email}</a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{request.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{request.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{request.planned_date ? new Date(request.planned_date).toLocaleDateString('fr-FR') : ''}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-bold">{request.quantity_requested}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{request.plant_species}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={request.activity_objective}>{request.activity_objective}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={request.additional_message || ''}>{request.additional_message}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">{request.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(request.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => exportToCSV([request], 'demande_plants')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Télécharger"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePlantRequest(request.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  const getCurrentCount = () => {
    switch (activeSection) {
      case 'partners': return partners.length;
      case 'newsletter': return newsletter.length;
      case 'member_cards': return memberCards.length;
      case 'contacts': return contacts.length;
      case 'sponsor_messages': return sponsorMessages.length;
      case 'quiz_responses': return quizResponses.length;
      case 'top_schools': return topSchools.length;
      case 'plant_requests': return plantRequests.length;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        {sidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-green-600 to-emerald-600">
            <h1 className="text-2xl font-bold text-white mb-1">Espace Admin</h1>
            <p className="text-green-100 text-sm">Podor Vert</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>


          <div className="p-4 border-t border-gray-200 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-bold uppercase tracking-wide"
            >
              <LogOut className="w-5 h-5" />
              <span>DÉCONNEXION</span>
            </button>
          </div>
        </div>
      </div>

      <div className="lg:ml-72 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {sections.find(s => s.id === activeSection)?.label}
            </h2>
            <p className="text-gray-600">
              Total: <span className="font-semibold text-green-600">{getCurrentCount()}</span> enregistrement(s)
            </p>
          </div>

          {renderTable()}
        </div>
      </div>

      {/* Message Modal */}
      {
        selectedMessage && (
          <MessageModal
            message={selectedMessage}
            isOpen={isMessageModalOpen}
            onClose={() => {
              setIsMessageModalOpen(false);
              setSelectedMessage(null);
            }}
          />
        )
      }
    </div >
  );
};

export default AdminPage;
