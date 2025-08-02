import { NavLink } from 'react-router-dom';

const LandingPage = () => {
    const services = [
        {
            title: "Gestion des Inscriptions",
            description: "Ajoutez facilement les élèves et organisez-les par classe pour un suivi clair et structuré."
        },
        {
            title: "Suivi des Contributions",
            description: "Consignez toutes les contributions financières et matérielles faites par les partenaires."
        },
        {
            title: "Tableaux de Bord Clairs",
            description: "Accédez à une vue d’ensemble de l’école, des inscriptions et des contributions."
        },
        {
            title: "Classement par Type",
            description: "Séparez les contributions en espèces et en nature pour une meilleure organisation."
        },
        {
            title: "Interface Simple et Intuitive",
            description: "Naviguez facilement grâce à une interface épurée pensée pour les utilisateurs non techniques."
        },
        {
            title: "Sauvegarde Sécurisée",
            description: "Toutes les données sont enregistrées en toute sécurité et accessibles à tout moment."
        },
    ];

    const howItWorksSteps = [
        {
            title: "Créer votre Compte",
            description: "Inscrivez-vous rapidement et configurez le profil de votre école."
        },
        {
            title: "Ajouter les Élèves et les Classes",
            description: "Ajoutez manuellement ou importez vos élèves et assignez-les à leurs classes."
        },
        {
            title: "Enregistrer les Contributions",
            description: "Ajoutez les contributions faites par les partenaires (en espèces ou en nature)."
        },
        {
            title: "Suivre et Gérer",
            description: "Visualisez toutes les données depuis un tableau de bord centralisé."
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800 font-inter">
            <div className="pt-20 flex-grow flex flex-col">
                <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
                    <div className="text-center max-w-3xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
                            Gérez les <span className="text-orange-500">Inscriptions et Contributions</span> de votre école en toute simplicité
                        </h2>
                        <p className="text-base sm:text-lg mb-8 text-gray-600">
                            Une plateforme intuitive pour gérer les élèves inscrits dans votre établissement et enregistrer les contributions (en espèces ou en nature) faites par vos partenaires.
                        </p>
                        <NavLink
                            to={"accounts/register"}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
                        >
                            Commencer
                        </NavLink>
                    </div>
                </main>

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
            </div>
        </div>
    );
};

export default LandingPage;