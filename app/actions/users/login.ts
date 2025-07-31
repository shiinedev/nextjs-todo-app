"use server"
import { login } from "@/app/lib/users";
import { loginUserResponse } from "@/app/types/user";


type LoginResponse = {
    message:string
    error:string
    user:loginUserResponse | null
}

export const loginAction = async (previousState:LoginResponse, formdata:FormData):Promise<LoginResponse> =>{

    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    if(!email || email.trim() === "" || !password || password.trim() === "")
        return {message:"",error:"all fields are required",user:null}


    const result = await login({email,password});

    if(!result)  return {message:"",error:"invalid credential",user:null}

    return {message:"user Login successfully ",error:"",user:result}

 
}