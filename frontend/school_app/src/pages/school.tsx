import { useEffect, useState } from 'react';
import LandingPage from './landing-page';
import { useParams } from 'react-router-dom';
import Overview from '../components/overview';


type User = {
    id: number;
    username: string;
    email: string;
}

type SchoolType = {
    id: number;
    name: string;
    is_admin: boolean;
    localisation: string;
    email: string | null;
    phone_number: string | null;
    admin: User;
    staff: User[];
}


const School = () => {
    const [activeTab, setActiveTab] = useState('appercu');
    const token = localStorage.getItem("access_token");
    const [school, setSchool] = useState<SchoolType>();
    const [reFetched, setReFetched] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/api/schools/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }    
        })
        .then(res => {
            return res.json();
        })
        .then(data => {setSchool(data)})
        .catch(err => {console.log("une erreur s'ést produite")});
    },[])


    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex">
        <nav className="w-64 bg-gray-900 text-white p-4 shadow-xl fixed h-full top-0">
            <h1 className="text-2xl font-bold text-orange-500 mb-6 mt-16">Tableau de Bord</h1>
            <ul className="space-y-2">
            <li>
                <button
                onClick={() => setActiveTab('appercu')}
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
                onClick={() => setActiveTab('students')}
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
                onClick={() => setActiveTab('professors')}
                className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 ${
                    activeTab === 'professors'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
                >
                Gestion des enseigants
                </button>
            </li>
            </ul>
        </nav>

        <div className="flex-1 ml-64 mt-16 p-6">
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-center items-center">
            <h2 className="text-2xl font-bold text-gray-800 text-center">{school?.name}</h2>
            </div>
            {activeTab === 'appercu' && <Overview school={school} />}
            {activeTab === 'students' && "Yoo"}
            {activeTab === 'professors' && "Yoo"}
        </div>
        </div>
    );
};

export default School;