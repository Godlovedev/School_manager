import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Overview from '../components/overview';
import Contribution from './contributions';
import Professor from './professors';
import Student from './students';
import { Menu } from 'lucide-react';

type User = {
  id: number;
  username: string;
  email: string;
};

type Representation = {
    students_count: number,
    professors_count: number
  }

export type SchoolType = {
  id: number;
  name: string;
  is_admin: boolean;
  localisation: string;
  email: string | null;
  phone_number: string | null;
  admin: User;
  staff: User[];
  representation: Representation
};

export type CashContribution = {
  id?: number;
  contributor_name?: string;
  amount?: number;
  date?: string;
  school?: SchoolType;
  total_amount?: number;
  item_name?: string;
  quantity?: number;
  description?: string | null;
};

export type InKindContribution = {
  id: number;
  contributor_name: string;
  item_name: string;
  quantity: number;
  description: string | null;
  date: string;
  school: SchoolType;
  amount?: number;
  total_amount?: number;
};

export type ContributionsData = {
  cash_contributions: CashContribution[];
  inkind_contributions: InKindContribution[];
};

const School = () => {
  const [activeTab, setActiveTab] = useState('appercu');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("access_token");
  const [school, setSchool] = useState<SchoolType>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/schools/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setSchool(data))
    .catch(() => console.log("Une erreur s'est produite"));
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) setSidebarOpen(false); // Ferme la sidebar sur petit écran
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex">
      {/* BOUTON MENU */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-full shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* SIDEBAR */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 pt-20 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold text-orange-500 mb-6">Tableau de Bord</h1>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleTabClick('appercu')}
              className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 ${
                activeTab === 'appercu'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              Aperçu Général
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabClick('students')}
              className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 ${
                activeTab === 'students'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              Gestion des Élèves
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabClick('professors')}
              className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 ${
                activeTab === 'professors'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              Gestion des Enseignants
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabClick('contributions')}
              className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 ${
                activeTab === 'contributions'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              Gestion des Contributions
            </button>
          </li>
        </ul>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <div className="flex-1 mt-16 p-6 w-full md:ml-64">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center">{school?.name}</h2>
        </div>
        {activeTab === 'appercu' && <Overview />}
        {activeTab === 'students' && <Student />}
        {activeTab === 'professors' && <Professor />}
        {activeTab === "contributions" && <Contribution />}
      </div>
    </div>
  );
};

export default School;