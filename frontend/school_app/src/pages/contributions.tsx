import { useEffect, useState } from "react";
import type { CashContribution, ContributionsData, InKindContribution, SchoolType } from "./school";
import { useParams } from "react-router-dom";
import CreateContribution from "../components/createContributionsDialog";

export default function Contribution() {
    const [contributions, setContributions] = useState<ContributionsData>();
    const [cashSearch, setCashSearch] = useState('');
    const [inkindSearch, setInkindSearch] = useState('');
    const token = localStorage.getItem("access_token");
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [targetedContribution, setTargetedContribution] = useState<CashContribution | InKindContribution | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/schools/${id}/contributions/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(async(res) => {
            const data = await res.json();
            setContributions(data);
            console.log(data);
        })
        .catch(() => { console.log("une erreur s'est produite") });
    }, [open]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Partie gauche – liste des contributions */}
            <div className="w-2/3 bg-white border-r h-[630px] border-gray-300 overflow-y-auto p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold mb-4 text-orange-600">Toutes les contributions</h2>
                    <CreateContribution setOpen={setOpen} open={open} />
                </div>

                {/* Contributions en espèces */}
                <h3 className="text-md font-semibold text-gray-700 mt-4 mb-2">💵 Contributions en espèces</h3>
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                    Montant Total: {contributions?.cash_contributions[0]?.total_amount ?? 0} FCFA
                </h3>
                <input
                    type="text"
                    placeholder="Rechercher un contributeur..."
                    value={cashSearch}
                    onChange={(e) => setCashSearch(e.target.value)}
                    className="w-full p-2 mb-3 border rounded-md outline-orange-500"
                />
                {contributions?.cash_contributions
                    .slice(1)
                    .filter((c: any) =>
                        c.contributor_name?.toLowerCase().includes(cashSearch.toLowerCase())
                    )
                    .map((c: any) => (
                        <div
                            key={`cash-${c.id}`}
                            className="p-3 mb-2 border rounded-md flex shadow-sm hover:bg-gray-50 cursor-pointer"
                        >
                            <div>
                                <p className="font-bold">{c.contributor_name}</p>
                                <p className="text-sm text-gray-500">
                                    {c.amount} FCFA - {c.date}
                                </p>
                            </div>
                            <button
                                onClick={() => setTargetedContribution(c)}
                                className="ml-auto bg-orange-500 p-2 rounded-lg text-white font-bold"
                            >
                                Voir
                            </button>
                        </div>
                    ))}

                {/* Contributions en nature */}
                <h3 className="text-md font-semibold text-gray-700 mt-6 mb-2">📦 Contributions en nature</h3>
                <input
                    type="text"
                    placeholder="Rechercher un contributeur..."
                    value={inkindSearch}
                    onChange={(e) => setInkindSearch(e.target.value)}
                    className="w-full p-2 mb-3 border rounded-md outline-orange-500"
                />
                {contributions?.inkind_contributions
                    .filter((c: any) =>
                        c.contributor_name?.toLowerCase().includes(inkindSearch.toLowerCase())
                    )
                    .map((c: any) => (
                        <div
                            key={`inkind-${c.id}`}
                            className="p-3 mb-2 border flex rounded-md shadow-sm hover:bg-gray-50 cursor-pointer"
                        >
                            <div>
                                <p className="font-bold">{c.contributor_name}</p>
                                <p className="text-sm text-gray-500">{c.item_name}</p>
                            </div>
                            <button
                                onClick={() => setTargetedContribution(c)}
                                className="ml-auto text-white bg-orange-500 p-2 rounded-lg font-bold"
                            >
                                Voir
                            </button>
                        </div>
                    ))}
                <div className="pb-[200px]"></div>
            </div>

            {/* Partie droite – détails d’une contribution */}
            <div className="flex-1 bg-white p-8 overflow-y-auto shadow-lg rounded-lg max-w-4xl mx-auto">
                {targetedContribution && 'amount' in targetedContribution ? (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl flex font-extrabold text-orange-500 mb-6 border-b-2 border-orange-300 pb-2">
                                💰 Contribution en espèces
                                <span className="ml-auto">
                                    <button className=" bg-orange-500 p-2 rounded-lg text-white font-bold">Modifier</button>
                                </span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 bg-orange-50 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-orange-700">Contributeur</h3>
                                <p className="text-gray-800">{targetedContribution.contributor_name}</p>
                            </div>
                            <div className="p-6 bg-orange-50 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-orange-700">Montant</h3>
                                <p className="text-gray-800">{targetedContribution.amount} FCFA</p>
                            </div>
                            <div className="p-6 bg-orange-50 rounded-lg shadow-md md:col-span-2">
                                <h3 className="text-xl font-semibold mb-2 text-orange-700">Date</h3>
                                <p className="text-gray-800">{targetedContribution.date}</p>
                            </div>
                        </div>
                    </div>
                ) : targetedContribution ? (
                    <div className="space-y-8">
                        <h2 className="text-3xl flex font-extrabold text-green-600 mb-6 border-b-2 border-green-300 pb-2">
                            🎁 Contribution en nature
                            <span className="ml-auto">
                                <button className=" bg-green-600 p-2 rounded-lg text-white font-bold">Modifier</button>
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 bg-green-50 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-green-700">Contributeur</h3>
                                <p className="text-gray-800">{targetedContribution.contributor_name}</p>
                            </div>
                            <div className="p-6 bg-green-50 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-green-700">Objet</h3>
                                <p className="text-gray-800">{targetedContribution.item_name}</p>
                            </div>
                            <div className="p-6 bg-green-50 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-green-700">Quantité</h3>
                                <p className="text-gray-800">{targetedContribution.quantity}</p>
                            </div>
                            {targetedContribution.description && (
                                <div className="p-6 bg-green-50 rounded-lg shadow-md md:col-span-2">
                                    <h3 className="text-xl font-semibold mb-2 text-green-700">Description</h3>
                                    <p className="text-gray-800">{targetedContribution.description}</p>
                                </div>
                            )}
                            <div className="p-6 bg-green-50 rounded-lg shadow-md md:col-span-2">
                                <h3 className="text-xl font-semibold mb-2 text-green-700">Date</h3>
                                <p className="text-gray-800">{targetedContribution.date}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400 italic text-center mt-32 text-xl">
                        Sélectionne une contribution pour voir les détails
                    </p>
                )}
            </div>
        </div>
    );
}