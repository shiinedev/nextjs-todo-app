
import { loginUser, loginUserResponse, registerUser } from "../types/user";
import { getUserCollection } from "./db";

export const register = async (user: registerUser): Promise<string | null> => {
    try {
        const collection = await getUserCollection();

        const existUser = await collection.findOne({ email: user.email });
      
        if (existUser) return null;
      
        const newUser = await collection.insertOne(user);
      
        return newUser.insertedId.toString();
        
    } catch (error) {
        console.log(error);
        return null
        
    }
 
};

export const login = async (data: loginUser): Promise<loginUserResponse | null> => {
  try {
    const collection = await getUserCollection();
    const user = await collection.findOne({ email: data.email });

    if (!user || user.password !== data.password)
      return null
    const result = {
      _id:user._id.toString(),
      username:user.username,
      email:user.email
    } 
    
    return result 

  } catch (error) {
    console.log(error);
    return null;
  }
};
