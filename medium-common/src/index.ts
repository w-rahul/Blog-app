import z from "zod"

export const  SignupInput = z.object({
    username:z.string().email(),
    password : z.string().min(6),
    name :  z.string()
})
  
export const  SigninInput = z.object({
    username:z.string().email(),
    password : z.string().min(6),
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const UpdateBlogInput = z.object({
    title : z.string(),
    content: z.string(),
    id: z.number()
})

export type SigninInput = z.infer<typeof SigninInput>
export type SignupInput = z.infer<typeof SignupInput>
export type createBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof UpdateBlogInput> 
   