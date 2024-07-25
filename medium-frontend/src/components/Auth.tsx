import { SignupInput } from "@rxhxul/medium-zod-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


export const Auth = ({type} : {type: "signup" | "login"}) =>{
    const Navigate  = useNavigate()
    const [postInputs, setpostInputs] = useState<SignupInput>({
        username: "",
        name:"",
        password: ""
    })

    async function SendReq(){
      try {
        const response  = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`, postInputs)
        localStorage.setItem("token", response.data.token)
        Navigate("/blogs")

      } catch (e) {
       alert("Invalid inputs")
        console.log(e)
      }  
    }

    return <div  className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="px-10">
            <div>
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate=400 font-light">
                  {type==="signup"?"Already have an account?":"Don't have an account"}
                    <Link className="pl-2 underline" to={type==="signup"?"/Login":"/Signup"}>
                    {type==="signup"?"Login":"Signup"} </Link>
                </div>
            </div>
            <div >
            {type==="signup"? <LabelledInput label="Name" placeholder="TopG" onchange={(e) =>{
                        setpostInputs({
                            ...postInputs,
                            name : e.target.value
                        })
                        }}  /> :null}
                    <LabelledInput label="Email" placeholder="TopG@gmail.com" onchange={(e) =>{
                        setpostInputs({
                            ...postInputs,
                            username : e.target.value
                        })
                        }} />
                    <LabelledInput label="Password" type ={"password"}  placeholder="******" onchange={(e) =>{
                        setpostInputs({
                            ...postInputs,
                            password : e.target.value
                        })
                        }} />
            </div>
            <div>
            <button onClick={SendReq} type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type ==="signup"? "Sign up":"Login"  }</button>
            </div>
            </div>
        </div>
    </div>
}
 
interface LabelledInput {
    label: string
    placeholder: string
    onchange: (e :ChangeEvent<HTMLInputElement>)=>void
    type?: string 
}
 
function LabelledInput({label,placeholder,onchange,type}:LabelledInput){
    return <div>
          <div>
            <label className="block mb-2 text-xl font-bold text-gray-900 tex-black pt-4">{label}</label>
            <input onChange = {onchange} type={type || "text"} className="bg-gray-50 border border-gray-400 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder}required />
        </div>
    </div>
} 