import { useState } from "react"
import { Appbar } from "./Appbar"
import { ChangeEvent } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Publish =() =>{
    const [title, setTtile] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    return <div>
            <Appbar />
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
               <input onChange={e=>{
                setTtile(e.target.value)
               }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />
               <TextEditor onchange={e=>{
                setContent(e.target.value)
               }} />  
         <button  onClick={async () =>{
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create` ,{
                 title,
                 content
            },{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            navigate(`/blog/${Number(response.data.id)}`)
        }}  type="submit" className="mt-5 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center
                text-white bg-blue-700 rounded-lg focus: ring-4 focus: ring-blue-200 dark: focus: ring-blue-900
                hover:bg-blue-800"> 
            Publish blog
        </button>
            </div>
        </div>
    </div>
}

function TextEditor({ onchange }: {onchange: ( e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return  <form>  
    <div className="w-full mb-4 border">
        <div className="flex items-center justify-between border-b ">
            <div className="py-2 bg-white rounded-b-lg  w-full">
        <label className="sr-only">Publish post</label>
            <textarea onChange={onchange} id="editor" rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white
                border-0" placeholder="Write an article..." required />
            </div>
        </div> 
    </div>
</form>
}