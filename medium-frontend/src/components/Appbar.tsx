import { Link, useNavigate, useParams} from "react-router-dom"
import { Avatar } from "./BlogCard"
import { BLOGS, useBlog } from "../hooks/hook"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface AppbarProps {
    type?: "singleblog" 
    Blog?: BLOGS 
}

export const Appbar = ({type,Blog}:AppbarProps) =>{
    const {id} = useParams<{id:string}>()
    const blogID = id
    const navigate = useNavigate()
    const Token = localStorage.getItem("token")

    const DeleteBlog = async ()=>{
        try {        
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete`,{
                headers:{
                    Authorization : "Bearer " + localStorage.getItem("token")
                },
                data:{
                    id : Number(blogID)
                }
            })
            alert("Blog deleted successfuly")
            navigate("/blogs")
    
        } catch (error) {
            alert("You are not authorized to delete this blog")
            console.log(`An error has been occurred while deleting the blog  ${error}`)
        }
    }

    return <div className="border-b-2 flex justify-between px-10 py-4">
        <Link to={'/blogs'}>
        <div className="flex flex-col justify-center text-xl pt-2">
        ECHOINK
        </div>
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Create</button>
            </Link>

            {Token? <button type="button" onClick={()=>{
                localStorage.removeItem("token")
                navigate("/signup")
            }} className="mr-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Log out</button>:null}

            {type == "singleblog" && Token ?<button type="button" onClick={DeleteBlog} className="mr-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Delete blog</button> : null }
            <Avatar size={"big"} name = {Blog?.author.name}  />
        </div>
    </div>
}