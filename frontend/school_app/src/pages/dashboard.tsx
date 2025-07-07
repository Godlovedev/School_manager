// import { useState } from "react"
import { useEffect, useState, type FormEvent } from "react";
import {  MapPin, Plus, X } from "lucide-react";
import {DeleteDialog} from "../components/dialog";
import { Navigate, useNavigate } from "react-router-dom";


export default function Dashboard(){
    type User = {
        id: number;
        username: string;
        email: string;
    }

    type School = {
        id: number;
        name: string;
        is_admin: boolean;
        localisation: string;
        email: string | null;
        phone_number: string | null;
        admin: User;
        staff: User[];
    }

    const [schools, setSchools] = useState<School[]>([]);
    const [reFetched, setReFetched] = useState(false);
    const token = localStorage.getItem("access_token");
    const [showCreateForm, setShowCreateForm] = useState(false);

    const navigate = useNavigate()

    // recuperation des écoles sur l'api
    useEffect(() => {
        fetch("http://localhost:8000/api/schools/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) =>{
            return response.json() 
        })
        .then(data => {
            setSchools(data);
            
        })
    },[reFetched])


    const handleCreateSchool = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data = {
            name: form.get("name") as string,
            localisation: form.get("localisation") as string,
            email: form.get("email") as string,
            phone_number: form.get("phone_number") as string,
        };

        // envoie des donnés a l'api
        await fetch("http://localhost:8000/api/schools/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
        .then(async (response) => {
            const data = await response.json()
            if (response.ok) {
                setShowCreateForm(!showCreateForm);
                setReFetched(!reFetched);
            }

        })
        
    }

    const deleteSchool = (schoolId: string) => {
        fetch(`http://localhost:8000/api/schools/delete/${schoolId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            return response.json()
        })
        .then(data => {
            setReFetched(!reFetched);
        })
    }


    return (
        <div className="flex flex-col flex-grow p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
            <h2 className="text-4xl sm:text-5xl mt-14 font-extrabold mb-8 text-gray-900 text-center drop-shadow-lg">
                Gestion de mes <span className="text-orange-600">Écoles</span>
            </h2>

            {/* Create New School Section */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 mb-10 transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-3xl">
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:from-orange-600 hover:to-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75 text-lg"
                >
                    {showCreateForm ? (
                        <>
                            <span><X /></span>
                            Annuler la création
                        </>
                    ) : (
                        <>
                            <span><Plus /></span>
                            Créer une nouvelle école
                        </>
                    )}
                </button>

                {showCreateForm && (
                    <form className="mt-8 space-y-6" onSubmit={(e) => handleCreateSchool(e)} >
                        <div>
                            <label htmlFor="schoolName" className="block text-base font-semibold text-gray-800 mb-2">Nom de l'école</label>
                            <input
                                type="text"
                                id="Nom de l'école"
                                name="name"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base placeholder-gray-400"
                                placeholder="Ex: École Primaire du Centre"
                            />
                        </div>
                        <div>
                            <label htmlFor="schoolLocation" className="block text-base font-semibold text-gray-800 mb-2">Localisation</label>
                            <input
                                type="text"
                                id="schoolLocation"
                                name="localisation"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base placeholder-gray-400"
                                placeholder="Ex: Douala, Cameroun"
                            />
                        </div>
                        <div>
                            <label htmlFor="schoolemail" className="block text-base font-semibold text-gray-800 mb-2">Adresse email</label>
                            <input
                                type="text"
                                id="schoolemail"
                                name="email"
                                required={false}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base placeholder-gray-400"
                                placeholder="XXX@gmail.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="schoolephone" className="block text-base font-semibold text-gray-800 mb-2">Numéro de télephone</label>
                            <input
                                type="text"
                                id="schoolphone"
                                name="phone_number"
                                required={false}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base placeholder-gray-400"
                                placeholder="Ex: +237 6XX XX XX XX"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75 text-lg"
                        >
                            Ajouter l'école
                        </button>
                    </form>
                )}
            </div>

            {/* List of Schools */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200">
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Mes Écoles Existantes</h3>
                {schools.length === 0 ? (
                    <p className="text-gray-600 text-center py-8 text-lg">Aucune école enregistrée pour le moment. Créez-en une !</p>
                ) : (
                    <ul className="space-y-6">
                        {schools.map(school => (
                            <li key={school.id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-5 rounded-lg shadow-md border border-gray-100 transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg">
                                <div className="text-left mb-3 sm:mb-0 sm:mr-4 flex-grow">
                                    <p className="text-xl font-semibold text-orange-700 mb-1">{school.name}</p>
                                    <p className="text-base text-gray-600 flex items-center">
                                        <span><MapPin /></span>
                                        {school.localisation}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                                    <button
                                    onClick={() => navigate(`/dasboard/${school.id}`)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-base font-bold py-2 px-5 rounded-md transition duration-300 ease-in-out shadow-sm hover:shadow-md"
                                    >
                                        Gérer
                                    </button>
                                    {school.is_admin && <DeleteDialog deleteFunction={deleteSchool} id={school.id.toString()} />}
                                    {/* <button name={school.id.toString()} className="bg-red-500 hover:bg-red-600 text-white text-base font-bold py-2 px-5 rounded-md transition duration-300 ease-in-out shadow-sm hover:shadow-md" onClick={(e) => deleteSchool(e.currentTarget?.name)}>Supprimer</button> */}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};