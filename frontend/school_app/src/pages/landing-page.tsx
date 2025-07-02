import React from 'react';
import { NavLink } from 'react-router-dom';
import verifyToken from '../hook/token';

// Main LandingPage component


const LandingPage = () => {
    // Array of services to display
    verifyToken();

    const services = [
        {
            title: "Suivi des Performances",
            description: "Suivez en détail les progrès académiques de chaque élève, identifiez les forces et les faiblesses pour une intervention ciblée."
        },
        {
            title: "Rapports Personnalisés",
            description: "Générez des rapports clairs et personnalisés pour les parents et les enseignants, facilitant la compréhension des parcours d'apprentissage."
        },
        {
            title: "Communication École-Famille",
            description: "Améliorez la collaboration avec les familles grâce à des outils de communication intégrés et des mises à jour en temps réel."
        },
        {
            title: "Gestion des Activités",
            description: "Organisez et suivez la participation aux activités parascolaires, enrichissant l'expérience éducative des élèves."
        },
        {
            title: "Planification Pédagogique",
            description: "Soutenez les enseignants avec des outils pour la planification des leçons, le suivi du programme et l'évaluation continue."
        },
        {
            title: "Analyse des Tendances",
            description: "Obtenez des aperçus précieux sur les tendances de performance de l'école pour des décisions stratégiques éclairées."
        },
    ];

    // Array of "How it works" steps
    const howItWorksSteps = [
        {
            title: "Créer votre Compte",
            description: "Inscrivez-vous rapidement et configurez le profil de votre école en quelques étapes simples."
        },
        {
            title: "Ajouter vos Élèves et Classes",
            description: "Importez facilement les informations de vos élèves et organisez-les par classe pour un suivi efficace."
        },
        {
            title: "Saisir les Données Scolaires",
            description: "Enregistrez les notes, les présences et les comportements pour construire un historique complet de chaque élève."
        },
        {
            title: "Améliorer en Continu",
            description: "Utilisez les données pour prendre des décisions éclairées et mettre en place des stratégies d'amélioration continue."
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800 font-inter">
            {/* Header - Made fixed at the top */}
            <header className="bg-black text-white p-4 shadow-md fixed top-0 w-full z-50">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2 sm:mb-0">Excellence Scolaire</h1>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mt-2 sm:mt-0">
                        <NavLink
                            to={"/accounts/register"}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 w-full sm:w-auto"
                        >
                            Créer un compte
                        </NavLink>
                        <NavLink
                            to={"/accounts/login"}
                            className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 w-full sm:w-auto"
                        >
                            Se connecter
                        </NavLink>
                    </div>
                </div>
            </header>
            <div className="pt-20 flex-grow flex flex-col">
                {/* Hero Section - Main content area with light background */}
                <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
                    <div className="text-center max-w-3xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
                            Organisez la <span className="text-orange-500">Cérémonie d'Excellence Scolaire</span> avec Facilité
                        </h2>
                        <p className="text-base sm:text-lg mb-8 text-gray-600">
                            Notre application est conçue pour simplifier l'organisation et la gestion de la cérémonie de fin d'année, récompensant les meilleurs élèves et célébrant leurs réussites académiques.
                        </p>
                        <NavLink
                            to={"accounts/register"}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
                        >
                            Commencer
                        </NavLink>
                    </div>
                </main>

                {/* Services Section */}
                <section className="py-12 sm:py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">Nos <span className="text-orange-500">Services</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-orange-50 p-5 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-orange-100 flex flex-col items-center text-center"
                                >
                                    <div className="bg-orange-500 text-white text-xl sm:text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4 shadow-md">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-orange-700">{service.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-700">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-12 sm:py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">Comment ça <span className="text-orange-500">Marche ?</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {howItWorksSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 p-5 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200 flex flex-col items-center text-center"
                                >
                                    <div className="bg-orange-500 text-white text-xl sm:text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4 shadow-md">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900">{step.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-700">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div> {/* Closing div for padding-top */}

            {/* Footer - Kept black for contrast and primary color scheme */}
            <footer className="bg-black text-gray-400 p-4 text-center shadow-inner">
                <div className="container mx-auto">
                    <p className="text-sm sm:text-base">&copy; 2025 Excellence Scolaire. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
