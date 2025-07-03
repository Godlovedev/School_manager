import type React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function RegisterPage(){

    type DataType = {
        username: String | undefined,
        email: String | undefined,
        password: String | undefined,
    }

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: DataType = {
            username: formData.get("username")?.toString(),
            email: formData.get("email")?.toString(),
            password: formData.get("password")?.toString(),
        };

        fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Une erreur s'est produite.");
            }
            navigate("/accounts/login");
        })
        .catch((error) => {
            console.error("Error:", error);
            // Show error message
        });
    }

    return (
        <main className="flex-grow flex items-center justify-center p-4 sm:p-8 h-screen bg-gray-100">
            <div className="bg-white mt-6 p-9 rounded-lg shadow-xl mt-14 border border-gray-200 max-w-md w-full">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-orange-500">Créer un compte</h2>
                <p className="text-center text-gray-600 mb-8">Rejoignez la communauté Excellence Scolaire !</p>

                <form className="space-y-5" onSubmit={(e) => handleSubmit(e)} >
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            placeholder="exemple@domaine.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            // Removed value and onChange props
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            placeholder="Minimum 6 caractères"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
                    >
                        S'inscrire
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Déjà un compte ?{' '}
                    <NavLink
                        to={"/accounts/login"}
                        className="font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:underline"
                    >
                        Connectez-vous
                    </NavLink>
                </p>
            </div>
        </main>
    );
};