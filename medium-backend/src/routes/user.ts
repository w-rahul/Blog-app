import { Hono } from 'hono'
import {decode , jwt, sign, verify} from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate' 
import { SigninInput, SignupInput } from "@rxhxul/medium-zod-common"

export const userRouter = new Hono<{
	Bindings: {
	  DATABASE_URL: string,
    JWT_SECRET : string
	}
}>();


userRouter.post("/signup", async (c) =>{
      const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json()
  const result = SignupInput.safeParse(body)
  if (!result.success) {
    c.status(411); 
    return c.json({ message: 'Invalid inputs' });
  }
    try {
      const user = await prisma.user.create({
        data:{
          username: body.username,
          name: body.name,
          password: body.password
        },
      })
const token = await sign({id:user.id},c.env.JWT_SECRET)    
      return c.json({
          token
        })  
    } catch (error) {
      c.status(403)
      return c.json({"message":"Error while signing up"})
    }    
})

userRouter.post("/signin", async (c) =>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json()
    const {success} = SigninInput.safeParse(body)
    if(!success){
       c.status(411)
      return c.json({
        message : "Inavlid Inputs"
      })
    }
    const user = await prisma.user.findUnique({
          where:{
            username : body.username,
            password: body.password
          }
    })

    if(!user){
      c.status(403)
      return c.json({"message" : "Error while signin in"})
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({
      token : token
    })
      
  })
  