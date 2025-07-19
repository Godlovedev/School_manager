import { useEffect, useState } from "react";
import type { ContributionsData } from "./school";
import { useParams } from "react-router-dom";

export default function Contribution() {

    const [contributions, setContributions] = useState<ContributionsData>();
    const token = localStorage.getItem("access_token");
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8000/api/schools/${id}/contributions/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }    
        })
        .then(async(res) => {
            const data = await res.json()
            setContributions(data)
            })
        .catch(() => {console.log("une erreur s'est produite")});
    },[])
    
    return (
              <div className="flex h-screen bg-gray-100">
                {/* Partie gauche – liste des contributions */}
                <div className="w-1/3 bg-white border-r border-gray-300 overflow-y-auto p-4">
                  <h2 className="text-xl font-bold mb-4 text-orange-600">Toutes les contributions</h2>
          
                  {/* Contributions en espèces */}
                  <h3 className="text-md font-semibold text-gray-700 mt-4 mb-2">💵 Contributions en espèces</h3>
                  {contributions?.cash_contributions.slice(1).map((c: any) => (
                    <div
                      key={`cash-${c.id}`}
                      className="p-3 mb-2 border rounded-md shadow-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <p className="font-bold">{c.contributor_name}</p>
                      <p className="text-sm text-gray-500">{c.amount} FCFA - {c.date}</p>
                    </div>
                  ))}
          
                  {/* Contributions en nature */}
                  <h3 className="text-md font-semibold text-gray-700 mt-6 mb-2">📦 Contributions en nature</h3>
                  {contributions?.inkind_contributions.map((c: any) => (
                    <div
                      key={`inkind-${c.id}`}
                      className="p-3 mb-2 border rounded-md shadow-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <p className="font-bold">{c.contributor_name}</p>
                      <p className="text-sm text-gray-500">{c.item_name} - {c.date}</p>
                    </div>
                  ))}
                </div>
          
                {/* Partie droite – détails d’une contribution (à remplir plus tard) */}
                <div className="flex-1 bg-white p-6 overflow-y-auto">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Détails de la contribution</h2>
                  <p className="text-gray-600">Clique sur une contribution pour voir les détails ici.</p>
                </div>
              </div>
    )
}