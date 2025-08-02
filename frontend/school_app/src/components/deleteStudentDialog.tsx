import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"



export default function DeleteStudent({id, studentId, fetched, setfetched}: {id?:string, studentId:string, fetched: boolean, setfetched: (fetched: boolean) => void}) {

    const deleteFunction = (id?: string) => {
        fetch(`http://localhost:8000/api/schools/${id}/students/${studentId}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        .then(() => {setfetched(!fetched)})
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger className="text-sm px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition">Supprimer</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">Suppression d'élèves</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        Cette action est irréversible. Voulez vous vraiment supprimer cet élève ?
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white text-base font-bold py-2 px-5 rounded-md transition duration-300 ease-in-out shadow-sm hover:shadow-md" onClick={() => deleteFunction(id)}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}