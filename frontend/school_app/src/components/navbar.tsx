import { useState } from "react";
import { NavLink } from "react-router-dom";
import { isTokenValid } from "../hook/token";
import { Logout } from "../hook/deconnexion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-black text-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-orange-500">
          School-Pilot
        </h1>
        <button
          onClick={toggleMenu}
          className="sm:hidden text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
        >
          <svg
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3 5.7a1 1 0 010 1.4L13.4 12l4.9 4.9a1 1 0 01-1.4 1.4L12 13.4l-4.9 4.9a1 1 0 01-1.4-1.4l4.9-4.9-4.9-4.9a1 1 0 111.4-1.4L12 10.6l4.9-4.9a1 1 0 011.4 0z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            )}
          </svg>
        </button>
        <nav className="hidden sm:flex space-x-4 items-center">
          {isTokenValid() ? (
            <NavLink
              to={""}
              onClick={() => Logout()}
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Déconnexion
            </NavLink>
          ) : (
            <>
              <NavLink
                to={"/accounts/register"}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Créer un compte
              </NavLink>
              <NavLink
                to={"/accounts/login"}
                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Se connecter
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="sm:hidden bg-black w-full px-4 pb-4 flex flex-col items-start space-y-2">
          {isTokenValid() ? (
            <NavLink
              to={""}
              onClick={() => {
                Logout();
                setIsOpen(false);
              }}
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded-full w-full text-center"
            >
              Déconnexion
            </NavLink>
          ) : (
            <>
              <NavLink
                to={"/accounts/register"}
                onClick={() => setIsOpen(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-full text-center"
              >
                Créer un compte
              </NavLink>
              <NavLink
                to={"/accounts/login"}
                onClick={() => setIsOpen(false)}
                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded-full w-full text-center"
              >
                Se connecter
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}