import { useParams } from "react-router-dom"
import { useBlog, useCustomTitle } from "../hooks/hook"
import { SingleBlog } from "../components/SingleBlogCOMP"
import { Loader } from "../components/Loader"
import { Appbar } from "../components/Appbar"

export const Blog = ()=>{

    useCustomTitle("E-INK | Full Blog")

    const {id} = useParams()
    const {loading, blog} = useBlog({
        id: id || ""
    })
    if (loading || !blog){
        return <div>
            <Appbar />
             <div className="flex justify-center">
                <Loader />            
            </div>
    </div>
    }
    return <div>
          <SingleBlog blog={blog} /> 
    </div>
}