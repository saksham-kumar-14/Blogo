import { ArrowLeftIcon, TrashIcon, UserIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router'; 
import { useEffect, useState } from 'react';
import Head from 'next/head';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const Blog = ({ allBlogs }) => {
    const router = useRouter();
    const blogId = router.query.blog;
    const [blogInfo, setBlogInfo] = useState();
    const [userInfo , setUserInfo] = useState();

    function deleteBlog(){
        axios.post("http://localhost:3001/deleteBlog" , {
            id : blogId
        })

        router.push("../")
    }

    function purifyCookie(token){
        let start = 0;
        for(let i=0;i<token.length;i++){
            if(token[i]==="="){
                start = i+1;
                break;
            }
        }

        return token.slice(start,token.length);
    }

    useEffect(async()=>{

        // for  blog
        allBlogs.map((e)=>{
            if(e.id===blogId){
                setBlogInfo(e);
            }
        })

        // for user
        const token = purifyCookie(document.cookie);
        const res = await axios.get("http://localhost:3001/api/login", {
            headers: {
                'user-info' : token
            }
        });
        const data = await res.data;
        if(data.userExists){
            const user = jwt.decode(token);
            setUserInfo(user);
        }else{
            alert("Failed to login!");
        }

    },[])

    return(
        <>

        <div className="py-4 px-4">
            <ArrowLeftIcon onClick={()=>{
                router.push("../")
            }} className='w-[2rem] rounded-full duration-300 hover:bg-gray-300 cursor-pointer' />
        </div>

        {blogInfo!==undefined ?
            <div>
                <Head>
                    <title>Blogo - Blog Details</title>
                </Head>

                <div className='flex items-center justify-center border-2 border-black rounded-3xl mx-4 my-4 px-4 py-4'>
                    <UserIcon className='w-[4rem] rounded-full bg-red-500'/>
                    <span className='mx-4'>
                        <span>Author: </span>
                        <span className='font-bold hover:underline'>{blogInfo.name} </span>
                    </span>
                    <span className='text-gray-600 text-[0.9rem] hover:underline'>{blogInfo.email}</span>
                </div>
                <div className='flex justify-end items-center px-8'>
                    <span>Published : </span>
                    <span className='hover:underline text-gray-600'>{blogInfo.time}</span>
                </div>

                <div className="flex flex-col justify-center mx-[30%] border-[0.12rem] border-gray-300 rounded-3xl py-4 px-4">
                
                    <div className='flex justify-center items-center border-b-[0.1rem] border-gray-300'>
                        <span className='text-[3rem] text-black font-bold'>{blogInfo.title}</span>
                    </div>

                    <div className="py-5 px-3 text-[1.15rem]">
                        <span>{blogInfo.content}</span>
                    </div>

                    { userInfo!==undefined && userInfo!==null && 
                    <div className="px-3">
                        {userInfo.name===blogInfo.name &&
                        <button  onClick={()=>{
                            deleteBlog();
                        }} >
                            <TrashIcon className='hover:text-red-600 duration-300 w-[2.5rem]'/>
                        </button>}
                    </div>
                    }

                </div>

            </div>
        : 
        <div>
            <Head>Not Found</Head>
            Not found!
        </div>}
        </>
    )
}

export const getServerSideProps = async () => {

    const res = await fetch("http://localhost:3001/getBlogs");
    const data = await res.json();

    return{
        props: {
            allBlogs:data
        }
    }
}

export default Blog;