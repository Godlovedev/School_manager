import {jwtDecode, type JwtPayload} from "jwt-decode"
import { useEffect, type JSX } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export function isTokenValid(): boolean {
    const token = localStorage.getItem("access_token")
    if (!token) {
        return false;
    }

    try{
        const decodedToken: any = jwtDecode(token);
        const now = Date.now() / 1000;
        return decodedToken.exp > now;

    }catch(e){
        return false
    }
}


export default function PrivateRoute({children}: {children: JSX.Element}) {
    return isTokenValid() ? children :<Navigate to="/accounts/login" state={{from: location.pathname}} /> ;
}