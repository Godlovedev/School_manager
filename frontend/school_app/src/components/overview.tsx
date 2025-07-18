type User = {
    id: number;
    username: string;
    email: string;
}

type SchoolType = {
    id: number;
    name: string;
    is_admin: boolean;
    localisation: string;
    email: string | null;
    phone_number: string | null;
    admin: User;
    staff: User[];
}

export default function Overview({school}: {school: SchoolType | undefined}) {
    console.log(school);
    
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Aperçu Général</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Total Élèves</p>
                    <p className="text-3xl font-semibold text-orange-700">1250</p>
                </div>
                {/* Total Enseignants Block */}
                <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Total Enseignants</p>
                    <p className="text-3xl font-semibold text-orange-700">75</p>
                </div>
                {/* Classes Actives Block */}
                <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">Classes Actives</p>
                    <p className="text-3xl font-semibold text-orange-700">42</p>
                </div>
            </div>
      </div>
    )
}