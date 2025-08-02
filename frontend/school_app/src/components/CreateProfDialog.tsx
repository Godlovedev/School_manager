import type React from "react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogFooter,
} from "./ui/alert-dialog"


export default function CreateProf({setOpen, open, id, setfetched, fetched}: {setOpen: (value: boolean) => void, open: boolean, id?: string, setfetched: (value:boolean) => void, fetched: boolean}){

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            prenom: formData.get("prenom") as string,
        }
        fetch(`http://localhost:8000/api/schools/${id}/professors/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(data)
        })
        .then(() => {setOpen(false); setfetched(!fetched)})
    }

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition-colors">Ajouter un enseigant</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Ajout d'enseigant</AlertDialogTitle>
                    <AlertDialogDescription>
                    <div>
                    <form action="" onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 gap-3">
                        <input type="text" className="border-solid border-1 rounded-md p-3" placeholder="Nom de l'enseignant" name="name" />
                        <input type="text" placeholder="Prénom de l'enseignant" className="border-solid border-1 rounded-md p-3" name="prenom" />
                        <div className="flex gap-3 justify-between">
                            <button className="ml-auto border-1 border-solid rounded-lg p-2" type="button" onClick={() => {setOpen(!open)}}>Annuler</button>
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