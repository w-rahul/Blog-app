import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface BLOGS {
    "content" :string
    "title" :string
    "id" :string
    "author":{
      "name" : string  
    } 
}

export const useBlog = ({ id } : {id: string })=>{
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<BLOGS | null>(null); 

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
              headers: {
                Authorization: "Bearer " +  localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog)
                setLoading(false)
        })
      
    }, [])
     
    return {
        loading,
        blog
    }
}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BLOGS[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
              headers: {
                Authorization: "Bearer " +  localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs)
                setLoading(false)
        })
      
    }, [])
     
    return {
        loading,
        blogs
    }
}