import {jwtDecode} from "jwt-decode"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function verifyToken(): void {

    const navigate = useNavigate();

    const token = localStorage.getItem("access_token");
    if (!token) {
    console.warn("Aucun token trouvé.");
    return;
    }

    type DecodedToken = {
        exp: number; // timestamp d'expiration
        iat?: number; // timestamp de création (facultatif)
        [key: string]: any;
      };
      

    const decoded: DecodedToken = jwtDecode(token);
    const expirationDate = new Date(decoded.exp * 1000);
    const now = new Date();

    console.log("✅ Token décodé :", decoded);
    console.log("⏳ Expire le :", expirationDate.toLocaleString());

    if (expirationDate > now) {
        useEffect(() => {
            navigate("/dashboard");
        },[]);
    } else {
        console.warn("⚠️ Le token a expiré !");
        useEffect(()=>{
            navigate("/")
        },[])
    }
}

async function refreshAccessToken(refreshToken: string) {  
    const response = await fetch("http://localhost:8000/api/token/refresh/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
    throw new Error("Échec du rafraîchissement du token.");
    }

    const data = await response.json();

    // Stocker le nouveau token
    // localStorage.setItem("access_token", data.access);
    // localStorage.setItem("refresh_token", data.refresh);
    console.log(data);
    

}