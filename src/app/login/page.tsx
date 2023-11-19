"use client"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; 

export default function LoginPage(){
    const [user,setUser] = React.useState({
        email:"",
        password: ""
    })

    const onLogin = async () => {
    };

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
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
                Login
            </button>
            <Link href={"/signup"}>Go to Sign Up</Link>
        </div>
    );
}
