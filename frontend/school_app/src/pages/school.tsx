import { useState } from "react"
import { useParams } from "react-router-dom"


type User = {
    id: number;
    username: string;
    email: string;
}

type School = {
    id: number;
    name: string;
    is_admin: boolean;
    localisation: string;
    email: string | null;
    phone_number: string | null;
    admin: User;
    staff: User[];
}

export default function School(){
    const { id } = useParams()

    const [school, setSchool] = useState<School[]>([])

    return (
        <div  className="mt-20">
            bienvenu sur la page de l'ecole d'id {id}
        </div>
    )
}