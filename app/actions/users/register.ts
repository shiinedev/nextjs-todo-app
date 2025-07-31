"use server"

import { register } from "@/app/lib/users";
import { ActionResponse } from "@/app/types/todos";
import { redirect } from "next/navigation";


export const registerAction = async(previousState:ActionResponse ,formdata:FormData):Promise<ActionResponse> =>{

    const username = formdata.get("username") as string;
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const confirmPassword = formdata.get("confirmPassword") as string;

    if(!username || username.trim() === "" || !email || email.trim() === "" || !password){
        return {message:"",error:"all fields are required"}
    }

    if(password.length < 6) return  {message:"",error:"password must be at least 6 characters"}
    if(confirmPassword !== password ) return  {message:"",error:"password do not matching"}


    const result = await register({username,email,password})

    if(!result) return {message:"",error:"user already exists"}

    redirect("/login")


}