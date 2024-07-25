import { useEffect } from "react"
import { Auth } from "../components/Auth"
import { Qoute } from "../components/Qoute"
import { useNavigate } from "react-router-dom"
import { useCustomTitle } from "../hooks/hook"

export const Login = ()=>{

    useCustomTitle('E-INK | Login')

    const navigate = useNavigate()
    const Tokenvalue :string | null = localStorage.getItem("token")

    useEffect(()=>{
        if(Tokenvalue){
            navigate("/blogs")
        }
    },[Tokenvalue,navigate])

    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="login" />
        </div>
        <div>
            <Qoute />
        </div>
    </div>
}