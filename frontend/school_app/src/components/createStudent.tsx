import type React from "react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel
} from "./ui/alert-dialog"
import { useState } from "react";


export default function CreateStudent({id, fetched, setFetched}: {id?: string, fetched: boolean, setFetched: (value: boolean) => void}){

    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            prenom: formData.get("prenom") as string,
            classroom: formData.get("classroom") as string,
        };
        fetch(`http://localhost:8000/api/schools/${id}/students/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(data)
        })
        .then(() => {setFetched(!fetched); setOpen(false)})
    }

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow">+ Ajouter un élève</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Ajout d'élèves</AlertDialogTitle>
                    <AlertDialogDescription>
                    <div>
                    <form action="" onSubmit={(e) => {handleSubmit(e)}} className="grid grid-cols-1 gap-3">
                        <input type="text" className="border-solid border-1 rounded-md p-3" placeholder="Nom de l'élève" name="name" />
                        <input type="text" placeholder="Prénom de l'élèves" className="border-solid border-1 rounded-md p-3" name="prenom" />
                        <select name="classroom" className="border-solid border-1 rounded-md p-3" id="">
                            <option value="1">MATERNELLE</option>
                            <option value="2">SIL</option>
                            <option value="3">CP</option>
                            <option value="4">CE1</option>
                            <option value="5">CE2</option>
                            <option value="6">CM1</option>
                            <option value="7">CM2</option>
                        </select>
                        <div className="flex gap-3 justify-between">
                            <AlertDialogCancel className="ml-auto border-1 border-solid rounded-lg p-2">Annuler</AlertDialogCancel>
                            <button className="bg-orange-500 rounded-lg p-2 text-white font-bold" type="submit">Envoyer</button>
                        </div>
                    </form>
                    </div>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}