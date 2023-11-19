"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";


export default function SignupPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        username: "",
        email:"",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(true);
      }
    }, [user])
    
    const [loading,setLoading]= React.useState(false)

    const onSignUp =async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user)
            console.log("Signup Success ",response.data)
            router.push("/login")
        } catch (error : any) {
            console.log("Signup failed",error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    return(<div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 >{loading?"Processing....":"Signup"}</h1>
        <br />
        <hr/>
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text" 
        id="username" 
        name="username" 
        value={user.username}
        placeholder="Enter username..."
        onChange= {(e) => setUser({...user,username:e.target.value})}
        />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email" 
        id="email" 
        name="email" 
        value={user.email}
        placeholder="Enter email..."
        onChange= {(e) => setUser({...user,email:e.target.value})}
        />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password" 
        id="password" 
        name="password" 
        value={user.password}
        placeholder="Enter password..."
        onChange= {(e) => setUser({...user,password:e.target.value})}
        />
        <br />
        <button 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={()=>{onSignUp()}}
        >{buttonDisabled?"No Signup" :"Signup"}</button>
        <Link href={"/login"}>Visit Login Page</Link>
    </div>)
}