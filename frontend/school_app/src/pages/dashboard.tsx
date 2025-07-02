// import { useState } from "react"
import verifyToken from "../hook/token";

export default function Dashboard(){

    // const [connected, setConnected] = useState(false);

    verifyToken();
    return (
        <div>
            <p>hello bienvenu dans le dashboard</p>
        </div>
    )
}