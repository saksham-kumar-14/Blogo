import { TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useState } from "react";

const BlogForm = ({ setWriting , setBlogs , blogs , userInfo , setWarningContent , setShowLoginWarning }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function submitBlog(){
        let time = new Date();
        time = time.toString();
        time = time.slice(0,25);
        const blogId = Date.now().toString(36) + Math.random().toString(36).substr(2)


        const newBlogs = [];
        blogs.map((e)=>{ newBlogs.push(e); });

        newBlogs.push({
            name : userInfo.name,
            email : userInfo.email,
            title : title,
            content : content,
            time : time,
            id : blogId
        });
        setBlogs(newBlogs);

        axios.post("http://localhost:3001/createBlog" , {
            name : userInfo.name,
            email : userInfo.email,
            title : title,
            content : content,
            time : time,
            id : blogId
        })
        
        setWriting(false); 
    }

    return(
        <div className="opacity-90 w-[70%]">
            <div className="flex justify-end items-center">
                <button onClick={()=>{
                    setWriting(false)
                }}>
                    <TrashIcon className="w-[2.5rem] text-red-600" />
                </button>
            </div>

            <div className="flex flex-col justify-center px-3 py-3">
                <label className="text-[1.5rem] mx-[1rem] font-semibold text-white">Title</label>
                <input onChange={(e)=>{setTitle(e.target.value)}} className="rounded-3xl py-3 px-3 outline-none bg-white text-black" placeholder="title"></input>
            </div>

            <div className="flex flex-col justify-center px-3 py-3">
                <label className="text-[1.5rem] mx-[1rem] font-semibold text-white">Content</label>
                <textarea onChange={(e)=>{setContent(e.target.value)}} className="rounded-3xl py-3 px-3 h-[30vh] outline-none bg-white text-black" placeholder="content"></textarea>
            </div>

            <div className="flex items-center justify-center">
                <button onClick={()=>{
                    if(title!=="" && content!==""){
                        submitBlog()
                    }else{
                        setShowLoginWarning(true);
                        setWarningContent("Fill the entries first")   ;
                        alert("Fill the entries first")
                    }
                }} className="my-4 font-semibold text-white bg-green-500 w-[90%] rounded-xl hover:scale-105 py-2 px-4 duration-300 hover:bg-green-600">Submit</button>
            </div>

        </div>
    )
}

export default BlogForm;