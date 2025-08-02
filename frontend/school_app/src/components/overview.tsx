import { useEffect, useState } from "react";
import type { SchoolType } from "../pages/school";
import { useParams } from "react-router-dom";

export default function Overview() {
    const [school, setSchool] = useState<SchoolType>();
    const { id } = useParams();
  
    useEffect(() => {
      fetch(`http://localhost:8000/api/schools/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(res => res.json())
      .then(data => setSchool(data))
      .catch(() => console.log("Une erreur s'est produite"));
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Aperçu Général</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Total Élèves</p>
                    <p className="text-3xl font-semibold text-orange-700"> {school?.representation.students_count} </p>
                </div>
                {/* Total Enseignants Block */}
                <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Total Enseignants</p>
                    <p className="text-3xl font-semibold text-orange-700">{school?.representation.professors_count}</p>
                </div>
                {/* Classes Actives Block */}
                <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Classes</p>
                    <p className="text-3xl font-semibold text-orange-700">7</p>
                </div>
            </div>
      </div>
    )
}