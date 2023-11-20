"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React , {useState} from "react"
import Link from "next/link";



export default function ProfilePage(){
    const router = useRouter();
    const [data,setData]= useState("Nothing");

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    const onLogout = async ()=>{
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Success")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <h2
            className="p-1 mt-5 rounded bg-orange-500"
            >{data === "Nothing" ? "Nothing" : <Link 
            href={`/profile/${data}`}
            >{data}</Link>}</h2>

            <br/>
            <button
            className="p-4 rounded bg-blue-500"
            onClick={onLogout}
            >Logout</button>

            <button 
            className="p-4 rounded bg-green-700 mt-5" 
            onClick={getUserDetails}
            >Get USer Details</button>
        </div>
    )
}