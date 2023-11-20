"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 && user.email.length > 0){
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(true);
      }
    }, [user])
    
    const [loading,setLoading]= React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login Sucess:",response.data);
            toast.success("Login Success");
            router.push("/profile");

        } catch (error:any) {
            console.log("Login failed ", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false)
        }
    };

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing...":"Login"}</h1>
            <br />
            <hr />
            <label htmlFor="email">Email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text" 
                id="email" 
                name="email" 
                value={user.email}
                placeholder="Enter email..."
                onChange={(e) => setUser({...user,email:e.target.value})}
            />
            <label htmlFor="password">Password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password" 
                id="password" 
                name="password" 
                value={user.password}
                placeholder="Enter password..."
                onChange={(e) => setUser({...user,password:e.target.value})}
            />
            <br />
            <button 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onLogin}
            >
                {buttonDisabled?"No Login":"Login"}
            </button>
            <Link href={"/signup"}>Go to Sign Up</Link>
        </div>
    );
}
