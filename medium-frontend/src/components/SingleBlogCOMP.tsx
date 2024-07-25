import { BLOGS } from "../hooks/hook"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const SingleBlog = ({blog}:{blog:BLOGS}) =>{
    return <div>
        <Appbar type="singleblog"/>
        <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-200 max-w-screen-xl">
            <div className="col-span-8">
            <div className="text-5xl font-extrabold pt-12">
                    {blog.title}
            </div>
            <div className="text-slate-500 pt-5">
              Published on 17th July 2024
            </div>
            <div className="pt-4">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4">
            <div className="text-slate-600 text-lg pl-6">
                Author
            </div>
    <div className=" flex w-full pt-5 pl-8">
        <div className="pr-4 flex flex-col justify center">
                <Avatar size="big" name={blog.author.name ||"Anonymous"} />
        </div>
          <div>
            <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
            </div>
            <div className=" pt-2 text-slate-500">
                Random catch phrase about the author's ability to grab user's attention
            </div>           
            </div>
        </div>
    </div>
        </div>
    </div>   
</div>
}