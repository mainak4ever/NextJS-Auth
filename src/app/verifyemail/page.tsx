"use client"
import axios from "axios"
import Link from "next/link"
import React,{useEffect, useState} from "react"

export default function VerifyEmailPage(){
    const [token,setToken] = useState("");
    const [verified,setVerified]=useState(false)
    const [error,setError]=useState(false);

    const verifyUserEmail = async () =>{
        try {
            await axios.post('/api/users/verifyemail',{token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }
    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl p-2 mt-5 bg-green-700 text-white">Email Verified</h2>
                    <Link href="/login">
                        <div className="mt-2 text-center">Login</div>
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl mt-5 bg-red-500 text-black">Token Expired</h2>
                    
                </div>
            )}
        </div>
    )
}