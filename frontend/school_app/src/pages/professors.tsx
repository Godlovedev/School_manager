import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { SchoolType } from "./school";
import CreateProf from "../components/CreateProfDialog";
import DeleteProf from "../components/deleteprofDialog";
import UpdateProf from "../components/updateProfDialog";


type Professor = {
    id: number;
    name: string;
    prenom: string;
    school: SchoolType;
};

export default function Professor(){

    const [professors, setProfessors] = useState<Professor[]>();
    const { id } = useParams()
    const [open, setOpen] = useState(false);

    const [fetched, setFetched] = useState(false);

    

    useEffect(() => {
        fetch(`http://localhost:8000/api/schools/${id}/professors/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then((res) => {return res.json()})
        .then((data) => {setProfessors(data)})
        .catch((error) => {console.log(error);
        })
    },[fetched])

    return (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-600">Liste des enseignants</h2>
            <CreateProf open={open} setOpen={setOpen} id={id} setfetched={setFetched} fetched={fetched} />
          </div>
      
          <div className="grid gap-4">
            {professors && professors.length > 0 ? (
              professors.map((prof) => (
                <div
                  key={prof.id}
                  className="bg-white shadow rounded-xl p-4 flex justify-between"
                >
                    <div>
                        <p className="text-lg font-semibold">{prof.name} {prof.prenom}</p>
                        <p className="text-sm text-gray-500">École : {prof.school.name}</p>
                    </div>
                    <div className="flex gap-3">
                        <UpdateProf id={id} profid={prof.id.toString()} fetched={fetched} setfetched={setFetched} />
                        <DeleteProf id={id} profId={prof.id.toString()} fetched={fetched} setfetched={setFetched} />
                    </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aucun enseignant trouvé.</p>
            )}
          </div>
        </div>
    );
}