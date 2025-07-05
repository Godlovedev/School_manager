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



export function DeleteDialog({deleteFunction, id}: {deleteFunction: (id: string) => void, id:string}) {

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 text-white text-base font-bold py-2 px-5 rounded-md transition duration-300 ease-in-out shadow-sm hover:shadow-md">Supprimer</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Suppression d'ecole</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est irréversible. Voulez vous vraiment supprimer cette école ?
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