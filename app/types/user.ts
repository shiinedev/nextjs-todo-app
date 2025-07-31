import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    email: string;
    username: string;
    password:string
}

export type registerUser = {
    username: string;
    email: string;
    password:string
}
export type loginUser = {
    email: string;
    password:string
}

export type loginUserResponse = {
    _id: string;
    email: string;
    username:string
}