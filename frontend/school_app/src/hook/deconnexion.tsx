import type { JSX } from "react"
import { Navigate } from "react-router-dom"

export function Logout(): JSX.Element {
    try {
        localStorage.setItem("access_token", " ")
        location.reload()
        return <Navigate to={"/"} />
    } catch (e) {
        return <Navigate to={"/"} />
    }
}