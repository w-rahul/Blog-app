import { Hono } from "hono"
import {decode , jwt, sign, verify} from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, UpdateBlogInput } from "@rxhxul/medium-zod-common"

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET : string       
    },
    Variables: {
        userId : string
    }
}>()

declare module 'hono' {
    interface HonoRequest {
      userId?: Number; 
    }
  }

blogRouter.use("/*", async(c,next)=>{

    try {
        const header = c.req.header("Authorization") || ""
        if (!header || !header.startsWith("Bearer ")) {
            c.status(403);
            return c.json({ message: "Unauthorized: Missing or invalid authorization header" });
          }
        const token = header.split(" ")[1] 
        const user = await verify(token, c.env.JWT_SECRET)
        if(user){
        //   c.set("userId", user.id as string)
          c.req.userId = user.id as number;
          await next()
        }
        else{
          c.status(403)
          return c.json({message: "unauthorized"})
        }
    } catch (error) {
        c.status(403)
        return c.json({message: "You are not logged in"}) 
    }
})

blogRouter.post("/create", async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message: "Invalid inputs"
        })
    }

    const authorId = c.req.userId
    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.json({
        id : blog.id
    })
})
  
blogRouter.put("/update", async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = UpdateBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message : "Invalid inputs"
        })
    }
    const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id
    })
})


blogRouter.get('/bulk', async (c) => {   
    try {
     const prisma = new PrismaClient({
         datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate())
     const blogs = await prisma.post.findMany({
         select: {
             content: true,
             title: true,
             id: true,
             author: {
                 select: {
                     name: true
                 }
             }
         }
     });
 
     return c.json({
         blogs
     })
    } catch (error) {
     c.status(403)
     return c.json({
         message: "Error while fetching blog"
     })
    } 
 })
 
blogRouter.get("/:id", async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    // const params = c.req.param()
    const param = c.req.param('id');
    try {
        const blog = await prisma.post.findFirst({
            where:{
                id : Number(param)
            },select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    
    } catch (e) {
        c.status(403)
        return c.json({
            message: "Error while fetching post"
        })
    }
})

blogRouter.delete("/delete", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    // try {
    //     const body = await c.req.json()
    //     const blog = await prisma.post.delete({
    //         where:{
    //             id : body.id
    //         }
    //     })
    //      c.status(200)
    //      return c.json({
    //             message: "Blog deleted successfully"
    //     })    
    // } catch (error) {
    //     console.log(`There has been a error while deleting the blog  ${error}`)
    // }
    try {
  
        const { id } = await c.req.json();
        const userId = c.req.userId;
    
        if (!userId) {
          c.status(403); 
          return c.json({ message: 'Unauthorized: User ID not found' });
    }
        const blog = await prisma.post.findUnique({
          where: { id },
        });
    
        if (!blog) {
          c.status(404);
          return c.json({ message: 'Blog not found' });
        }
    
        if (blog.authorId !== userId) { 
          c.status(403); 
          return c.json({ message: 'Forbidden: You are not allowed to delete this blog' });
        }

        await prisma.post.delete({
          where: { id },
        });
    
        c.status(200);
        return c.json({
          message: 'Blog deleted successfully',
        });
      } catch (error) {
        console.error('Error deleting blog:', error);
        c.status(500);
        return c.json({
          message: 'Internal Server Error',
          error: error,
        });
      }
})