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
import { useState } from "react"

export default function UpdateStudent({
    id,
    fetched,
    setFetched,
    studentId
}: {
    id?: string,
    fetched: boolean,
    setFetched: (value: boolean) => void,
    studentId: string
}) {
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data: Record<string, string | number> = {}

        const name = formData.get("name")?.toString().trim()
        const prenom = formData.get("prenom")?.toString().trim()
        const classroom = formData.get("classroom")?.toString().trim()
        const note = formData.get("note")?.toString().trim()

        if (name) data.name = name
        if (prenom) data.prenom = prenom
        if (classroom) data.classroom = classroom
        if (note !== "" && !isNaN(Number(note))) data.note = Number(note)

        if (Object.keys(data).length === 0) {
            alert("Veuillez remplir au moins un champ.")
            return
        }

        fetch(`http://localhost:8000/api/schools/${id}/students/${studentId}/update/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (!res.ok) throw new Error("Échec de la mise à jour")
            setFetched(!fetched)
            setOpen(false)
        })
        .catch((err) => {
            console.error("Erreur :", err)
        })
    }

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger className="text-sm px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700 transition">
                    Modifier
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Modification d'un élève</AlertDialogTitle>
                        <AlertDialogDescription>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
                                <input
                                    type="text"
                                    name="name"
                                    className="border border-gray-300 rounded-md p-3"
                                    placeholder="Nom de l’élève"
                                />
                                <input
                                    type="text"
                                    name="prenom"
                                    placeholder="Prénom de l’élève"
                                    className="border border-gray-300 rounded-md p-3"
                                />
                                <input
                                    type="number"
                                    name="note"
                                    placeholder="Note de l'élève"
                                    className="border border-gray-300 rounded-md p-3"
                                />
                                <select
                                    name="classroom"
                                    className="border border-gray-300 rounded-md p-3"
                                >
                                    <option value="">-- Sélectionner une classe --</option>
                                    <option value="1">MATERNELLE</option>
                                    <option value="2">SIL</option>
                                    <option value="3">CP</option>
                                    <option value="4">CE1</option>
                                    <option value="5">CE2</option>
                                    <option value="6">CM1</option>
                                    <option value="7">CM2</option>
                                </select>
                                <div className="flex justify-between">
                                    <AlertDialogCancel className="border border-gray-400 rounded-lg px-4 py-2">
                                        Annuler
                                    </AlertDialogCancel>
                                    <button
                                        className="bg-orange-500 hover:bg-orange-600 rounded-lg px-4 py-2 text-white font-bold"
                                        type="submit"
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}