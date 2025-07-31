import { useState } from "react";
import type React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel
} from "./ui/alert-dialog";

export default function UpdateProf({
  id,
  setfetched,
  fetched,
  profid
}: {
  id?: string,
  setfetched: (value: boolean) => void,
  fetched: boolean,
  profid?: string
}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString();
    const prenom = formData.get("prenom")?.toString();

    const data: Record<string, string> = {};
    if (name) data.name = name;
    if (prenom) data.prenom = prenom;

    fetch(`http://localhost:8000/api/schools/${id}/professors/${profid}/update/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        setfetched(!fetched);
        setOpen(false); // 👉 Fermer le modal après mise à jour
      });
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Modifier
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Modification</AlertDialogTitle>
            <AlertDialogDescription>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-3"
              >
                <input
                  type="text"
                  required={false}
                  className="border rounded-md p-3"
                  placeholder="Nom de l'enseignant"
                  name="name"
                />
                <input
                  type="text"
                  required={false}
                  placeholder="Prénom de l'enseignant"
                  className="border rounded-md p-3"
                  name="prenom"
                />
                <div className="flex gap-3 justify-between">
                  <AlertDialogCancel
                    className="ml-auto border rounded-lg p-2"
                    type="button"
                  >
                    Annuler
                  </AlertDialogCancel>
                  <button
                    className="bg-orange-500 rounded-lg p-2 text-white font-bold"
                    type="submit"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}