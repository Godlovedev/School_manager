import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage(){

    type DataType = {
        username: string | undefined;
        password: string | undefined;
    }

    const navigate = useNavigate();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data: DataType = {
            username: form.get("username")?.toString(),
            password: form.get("password")?.toString(),
        };

        fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur de connexion");
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            navigate("/dashboard")
            
        })
        .catch((error) => {
            throw new Error(`${error}`)
        })
    }

    return (
        <main className="flex-grow flex items-center justify-center p-4 sm:p-8 h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 max-w-md w-full">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-orange-500">Connexion</h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Connectez-vous pour accéder à votre compte.
                </p>
                <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            placeholder="Entrez votre nom d'utilisateur"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            placeholder="Minimum 6 caractères"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
                    >
                        Se connecter
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Vous n'avez pas de compte ?{' '}
                    <NavLink
                        to={"/accounts/register"}
                        className="font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:underline"
                    >
                        Creez un compte ici.
                    </NavLink>
                </p>
            </div>
        </main>
    );
};