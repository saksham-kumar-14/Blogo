import React from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import Axios from 'axios';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    const router = useRouter();

    async function getUsers(){
        const res = await fetch("http://localhost:3001/getUsers");
        const data = await res.json();
        return data;
    }

    async function registerUser(){
        const allUsers = await getUsers();
        const emailExists = false;
        allUsers.map((e)=>{
            if(e.email === email){
                emailExists = true;
            }
        })

        if(!emailExists){
            Axios.post('http://localhost:3001/createUser', {
                name : name,
                email : email,
                password : password,
            }).then(()=>{
                alert("User Created!");
                router.push("./signin")
            }).catch(()=>{
                alert("Some error occured")
            })

        }else{
            alert("This email already exists!")
        }
    }

    return(
        <>
        <Head>
            <title>Blogo - Register</title>
        </Head>
    
        <div className="h-[10vh] flex items-center justify-center py-4">
            <span onClick={()=>{
                router.push("../")
            }} className="font-semibold text-[3.5rem] cursor-pointer">Blogo</span>
        </div>

        <div className="flex flex-col items-center justify-center h-[90vh]">
        
            <div className="border-[0.1rem] rounded-3xl shadow-2xl px-4 py-6 w-[35%]">

                <div className="flex flex-col justify-center py-2">
                    <label className="font-semibold text-[1.1rem]">Name</label>
                    <input onChange={(e)=>{setName(e.target.value)}} className="outline-none border-[0.1rem] border-black rounded-2xl py-2 focus:border-2 px-3" type="text" placeholder="name"></input>
                </div>

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
                    if(name!=="" && password!=="" && email!==""){
                        registerUser()
                    }else{
                        alert("fill the fields properly.")
                    }
                }} className="rounded-3xl font-semibold py-3 px-5 bg-[rgb(10,10,10)] text-white w-[100%] my-4 duration-300 hover:bg-black">
                    Register
                </button>
            </div>

            <span className="mt-10">Already Registered? <a className="font-semibold text-blue-600" href="./signin">Sign In</a></span>

        </div>

        </>
    )
}


export default Register;