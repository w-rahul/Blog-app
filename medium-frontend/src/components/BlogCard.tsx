import { Link } from "react-router-dom"

interface BlogCardProps{
    AuthorName : string
    title : string
    content : string
    PublishedDate : string
    id: string
}

export const BlogCard = ({
    id,
    AuthorName,
    title,
    content, 
    PublishedDate
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="pt-6 p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <Avatar name={AuthorName} />
                <div className="pl-1 flex justify-center flex-col">
                {AuthorName}
                </div>
                <div className="flex justify-center flex-col pl-2 ">
                    <CicrleComp />
                </div>
                <div className="flex justify-center flex-col pl-2 font-thin text-slate-600 ">
                {PublishedDate}                    
                </div>
        </div>
        <div className="text-2xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.length >100 ?content.slice(0,100) + "....": content}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length /100)} minutes(s) read`}
        </div>
    </div> 
    </Link>
} 

function CicrleComp(){
    return <div className="h-1 w-1 rounded-full bg-slate-500 ">

    </div>
}

export   function Avatar({ name, size = "small" }: { name?: string, size?: "small" | "big" }) {
        const displayName = name && name.length > 0 ? name[0] : "A";
        // console.log(name)

        //  const displayName = name

    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {displayName}
    </span>
</div>
}