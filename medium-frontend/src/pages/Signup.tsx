import { useNavigate } from "react-router-dom"
import { Auth } from "../components/Auth"
import { Qoute } from "../components/Qoute"
import { useEffect } from "react"

export const Signup = () =>{
    const navigate = useNavigate()
    const Tokenvalue :string | null = localStorage.getItem("token")
    useEffect(() => {
        if (Tokenvalue) {
            navigate("/blogs");
        }
    }, [Tokenvalue, navigate]);

    return <div> 
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                    <Auth type="signup"/>
            </div >
            <div className="hidden lg:block">
                <Qoute />
            </div>
        </div>
    </div>
}
