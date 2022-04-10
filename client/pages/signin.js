import React, { useState } from "react";
import { EyeIcon , EyeOffIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Head from "next/head";
import Axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [password, setPassword] = useState("")
    
    const router = useRouter();

    const setCookie = (token) => {
        let cname = "user=" + token;
        const date = new Date();
        date.setTime(date.getTime() + (100*60*60*24*30))
        let expiry_date = "expires=" + date.toUTCString();
        
        const cookie = cname + "; " + expiry_date
        document.cookie = cookie 
    }

    async function loginUser(){

        const res = await Axios.post("http://localhost:3001/login" , {
            email : email,
            password : password
        })
        const data = res.data;

        if(data.user){
            setCookie(data.user);
            router.push("../")
        }else{
            alert("No such user found!")
        }
    }

    return(
        <>
        <Head>
            <title>Blogo - Sign in</title>
        </Head>

        <div className="h-[10vh] flex items-center justify-center py-4">
            <span onClick={()=>{
                router.push("../")
            }} className="font-semibold text-[3.5rem] cursor-pointer">Blogo</span>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[90vh]">
        
            <div className="border-[0.1rem] rounded-3xl shadow-2xl px-4 py-6 w-[35%]">

                <div className="flex flex-col justify-center py-2">
                    <label className="font-semibold text-[1.1rem]">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} className="outline-none border-[0.1rem] border-black rounded-2xl py-2 focus:border-2 px-3" type="text" placeholder="email"></input>
                </div>

                <div className="flex flex-col justify-center py-2">
                    <label className="font-semibold text-[1.1rem]">Password</label>
                    <div className="flex items-center px-2 border-[0.1rem] border-black rounded-2xl py-2 focus-within:border-2">
                        <input onChange={(e)=>{setPassword(e.target.value)}} className="w-[90%] outline-none px-3" type={passwordType} placeholder="password"></input>
                        <div className="w-[10%] flex items-center justify-center">
                            {
                                passwordType==="password" ?
                                <button onClick={()=>{
                                    setPasswordType("text")
                                }}>
                                    <EyeIcon className="w-[1.5rem]" />
                                </button>
                                :
                                <button onClick={()=>{
                                    setPasswordType("password")
                                }}>
                                    <EyeOffIcon className="w-[1.5rem]" />
                                </button>
                            }
                        </div>
                    </div>
                </div>

                <button onClick={()=>{
                    if(email!=="" && password!==""){
                        loginUser();
                    }else{
                        alert("fill the fields properly ..")
                    }
                }} className="rounded-3xl font-semibold py-3 px-5 bg-[rgb(10,10,10)] text-white w-[100%] my-4 duration-300 hover:bg-black">
                    Sign in 
                </button>
            </div>

            <span className="mt-10">Not Registered? <a className="font-semibold text-blue-600" href="./register">Register</a></span>

        </div>
        </>
    )
}


export default SignIn;