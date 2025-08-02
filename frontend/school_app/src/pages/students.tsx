import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { SchoolType } from "./school"
import CreateStudent from "../components/createStudent"
import DeleteStudent from "../components/deleteStudentDialog"
import UpdateStudent from "../components/UpdatetudentDialog"

type Student = {
  id: number
  name: string
  prenom: string
  note: number | null
  classroom: number
  school: SchoolType
}

type Classroom = {
  id: number
  name: string
  students: Student[]
}

export default function Student() {
  const [current, setCurrent] = useState<string>("MATERNELLE")
  const [classes, setClasses] = useState<Classroom[]>([])
  const { id } = useParams()
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8000/api/schools/${id}/students/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data)
        
      })
  }, [fetched])

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Liste des élèves</h2>
        <CreateStudent id={id} fetched={fetched} setFetched={setFetched} />
      </div>

      {/* Onglets */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-6">
        {classes.map((classroom) => (
          <button
            key={classroom.id}
            onClick={() => setCurrent(classroom.name)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm ${
              current === classroom.name
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {classroom.name}
          </button>
        ))}
      </div>

      {/* Tableau */}
      {classes
        .filter((c) => c.name === current)
        .map((classroom) => (
          <div key={classroom.id} className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow border border-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Nom</th>
                  <th className="px-6 py-3 text-left">Prénom</th>
                  <th className="px-6 py-3 text-left">Note</th>
                  <th className="px-6 py-3 text-left">Options</th>
                </tr>
              </thead>
              <tbody>
                {classroom.students.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 px-6 py-4">
                      Aucun élève dans cette classe.
                    </td>
                  </tr>
                ) : (
                  classroom.students.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.prenom}</td>
                      <td className="px-6 py-4">
                        {student.note !== null ? (
                          student.note
                        ) : (
                          <button className="text-sm px-3 py-1 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 transition">
                            Ajouter une note
                          </button>
                        )}
                      </td>
                      <td className="px-6 flex py-4 space-x-2">
                        <UpdateStudent id={id} studentId={student.id.toString()} fetched={fetched} setFetched={setFetched} />
                        <DeleteStudent id={id} studentId={student.id.toString()} setfetched={setFetched} fetched={fetched} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  )
}