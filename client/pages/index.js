import HomeBody from "../Components/Home/body";
import HomeHeader from "../Components/Home/header";
import HomeSubHeader from "../Components/Home/sub_header";
import BlogForm from "../Components/Home/blog_form";
import Warning from "../Components/warning"

import { useEffect, useState } from 'react';
import Head from 'next/head'

import jwt from 'jsonwebtoken';
import axios from "axios";

const Home = () => {
  const [loggedin, set_loggedin] = useState(false);
  const [writing, setWriting] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [warningContent, setWarningContent] = useState("");

  const [userInfo, setUserInfo] = useState();
  const [blogs, setBlogs] = useState([]);

  function purifyToken(token){
    let start = 0;
    for(let i=0;i<token.length;i++){
      if(token[i]==="="){ start = i+1; }
    }
    return token.slice(start, token.length);
  }

  useEffect(async()=>{
    const token = purifyToken(document.cookie);
    const res = await axios.get("http://localhost:3001/api/login", {
      headers: {
        'user-info' : token
      }
    });
    const data = await res.data;

    if(data.userExists){
      const user = jwt.decode(token);
      setUserInfo(user);
      set_loggedin(true);
    }else{
      setShowLoginWarning(true);
      setWarningContent("You are not logged in");
    }


    const blogRes = await axios.get("http://localhost:3001/getBlogs");
    const blogData = blogRes.data;
    setBlogs(blogData)

  },[])

  return(
    <div className="overflow-y-scroll h-[100vh]">
      <Head>
        <title>Blogo - Home</title>
      </Head>

      {showLoginWarning && <Warning content={warningContent} setShowLoginWarning={setShowLoginWarning}/>}

      <div className={loggedin?"text-black bg-[#c5e4ff]":"bg-amber-400 text-black"}>
        <HomeHeader loggedin={loggedin} userInfo={userInfo} />
        <HomeSubHeader loggedin={loggedin} />
      </div>
      
      <HomeBody writing={writing} setWriting={setWriting}
       loggedin={loggedin} setShowLoginWarning={setShowLoginWarning}
       blogs={blogs} setWarningContent={setWarningContent} />

      {writing &&
        <div className="absolute top-0 bg-black opacity-90 w-[100%] h-[100vh] flex justify-center items-center">
          <BlogForm setWriting={setWriting} setBlogs={setBlogs} blogs={blogs} 
          userInfo={userInfo} setShowLoginWarning={setShowLoginWarning}
          setWarningContent={setWarningContent}/>
        </div> 
       }

    </div>
  )
}


export default Home;