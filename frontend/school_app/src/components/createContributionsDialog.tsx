import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel,
  } from "./ui/alert-dialog"
import { useParams } from "react-router-dom";
import { X } from "lucide-react";



type ContributionType = "cash" | "inkind";

export default function CreateContribution({setOpen, open}: {setOpen: (value: boolean) => void, open: boolean}) {

    const [contributionType, setContributionType] = useState<ContributionType| null>(null);
    const { id } = useParams();

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger className="bg-orange-500 hover:bg-orange-600 text-white text-base font-bold py-2 px-5 rounded-md transition duration-300 ease-in-out shadow-sm hover:shadow-md">Ajouter</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <div className="flex items-center justify-between">
                            <AlertDialogTitle>Ajoute de contribution</AlertDialogTitle>
                            <AlertDialogCancel onClick={() => setContributionType(null)}><span><X /></span></AlertDialogCancel>
                        </div>
                        <AlertDialogDescription className="">
                            {contributionType ? <Create contribtype={contributionType} setContributionType={setContributionType} id={id} setOpen={setOpen} /> : <div className="grid grid-col-1">
                                <p className="text-center text-xl">Quel est la nature de la contribution que vous souhaitez ajouter</p>
                                <div className="flex items-center justify-center gap-3 mt-5">
                                    <button
                                    onClick={() => {setContributionType("cash")}}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-3 rounded-lg">Espèce</button>
                                    <button
                                    onClick={() => {setContributionType("inkind")}}
                                    className="text-orange-500 hover:bg-orange-600 border-1 border-solid border-orange-500 hover:text-white font-bold p-3 rounded-lg">Nature</button>
                                </div>
                            </div>}
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

const Create = ({contribtype, setContributionType, id, setOpen}: {contribtype: ContributionType, setContributionType: (c: "cash" | "inkind" | null) => void, id?:string, setOpen: (value: boolean) => void}) => {

    const handleCashSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            contributor_name: formData.get("contributor_name"),
            amount: formData.get("amount"),
        }
        fetch(`http://localhost:8000/api/schools/${id}/contributions/create-cash-contribution/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(data)
        })
        .then((res) => {setContributionType(null); setOpen(false)})
    }

    return (
        <div>
            {contribtype === "cash" ? <div>
                <form action="" onSubmit={(e) => handleCashSubmit(e)} className="grid grid-cols-1 gap-3">
                    <input type="text" className="border-solid border-1 rounded-md p-3" placeholder="Nom du contribuant" name="contributor_name" />
                    <input type="number" placeholder="Montant de la contribution" className="border-solid border-1 rounded-md p-3" name="amount" />
                    <div className="flex gap-3 justify-between">
                        <button className="ml-auto border-1 border-solid rounded-lg p-2" type="button" onClick={() => setContributionType(null)}>Annuler</button>
                        <button className="bg-orange-500 rounded-lg p-2 text-white font-bold" type="submit">Envoyer</button>
                    </div>
                </form>
            </div> : <div>contribution en nature</div>}
        </div>
    )
}