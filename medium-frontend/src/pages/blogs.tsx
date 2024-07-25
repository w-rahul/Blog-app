import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton"
import { useBlogs, useCustomTitle } from "../hooks/hook"
import { useEffect } from "react"


 
 export const Blogs =()=>{

    useCustomTitle('E-INK | Blogs')

    const Navigate = useNavigate()
    const Token = localStorage.getItem("token")
    useEffect(()=>{
        if(!Token){
            Navigate("/signup")
        }
    },[Token,Navigate])    

    const {loading, blogs} = useBlogs()

        if (loading){
        return <div>
                <Appbar />
             <div className="flex justify-center">
            <div>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        </div>
     </div>
    }
    
   return <div> 
        <Appbar />
    <div className="flex justify-center"> 
     <div>
            {blogs.map((lolo)=><BlogCard
            id={lolo.id} 
            key={lolo.id}
            AuthorName={lolo.author.name || "Anonymous"}
            title ={lolo.title}
            content={lolo.content}
            PublishedDate={"16th July 2024"} 
           />)}
        </div>
    </div>
</div>
}
