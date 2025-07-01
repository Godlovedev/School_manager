import { NavLink } from "react-router-dom"

export default function Navbar(){
    return (
        <div className="">
            <nav className="fixed z-50 top-0 w-full left-0 right-0 grid  grid-cols-2 px-3 py-7 bg-black mx-auto text-white shadow-xl">
                <div className="md:m-auto">
                    <NavLink className="font-bold text-2xl" to={"/"}>
                    School App
                    </NavLink>
                </div>
                

                <div className="mt-2 ml-auto md:mr-5">
                    <NavLink to={""} className={"bg-orange-500 text-white font-bold p-2 rounded xl"} >Commencer</NavLink>
                </div>
            </nav>
        </div>
    )
}