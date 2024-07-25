import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/hook"
import { SingleBlog } from "../components/SingleBlogCOMP"
import { Loader } from "../components/Loader"
import { Appbar } from "../components/Appbar"

export const Blog = ()=>{
    const {id} = useParams()
    const {loading, blog} = useBlog({
        id: id || ""
    })
    if (loading){
        return <div>
            <Appbar />
             <div className="flex justify-center">
                <Loader />            
            </div>
    </div>
    }
    return <div>
          <SingleBlog Blog={blog} /> 
    </div>
}