import { NavLink } from "react-router-dom"
import { isTokenValid } from "../hook/token"
import { Logout } from "../hook/deconnexion"

export default function Navbar(){
    return (
        <header className="bg-black text-white p-4 shadow-md fixed top-0 w-full z-50">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2 sm:mb-0">Excellence Scolaire</h1>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mt-2 sm:mt-0">
                    {isTokenValid() ? <NavLink to={""} onClick={() => Logout()} className={"border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 w-full sm:w-auto"} >Deconnexion</NavLink> :<div  className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mt-2 sm:mt-0" ><NavLink
                        to={"/accounts/register"}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 w-full sm:w-auto"
                    >
                        Créer un compte
                    </NavLink>
                    <NavLink
                        to={"/accounts/login"}
                        className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 w-full sm:w-auto"
                    >
                        Se connecter
                    </NavLink></div> }
                </div>
            </div>
        </header>
    )
}