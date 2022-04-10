import { useRouter } from 'next/router';
import axios from 'axios';

const HomeHeader = ({ loggedin , userInfo }) => {
    const router = useRouter()

    function removeCookies(){
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        location.reload();
    }

    function deleteUser(){
        axios.post("http://localhost:3001/deleteUser" , {
            email : userInfo.email,
            password  :userInfo.password,
        }).then(()=>{
            location.reload()
        }).catch(()=>{
            alert("Some error occured!")
        })
    }

    return(
        <div className={loggedin ? "grid grid-cols-2 px-16 py-[0.15rem] fixed w-[100%] border-b-[0.12rem] border-black bg-[#c5e4ff]":
        "grid grid-cols-2 px-16 py-[0.15rem] fixed w-[100%] border-b-[0.12rem] border-black bg-amber-400"}>
            <div className="flex justify-start items-center">
                <h1 onClick={()=>{
                    location.reload()
                }} className="font-semibold text-[3rem] cursor-pointer">Blogo</h1>
            </div>

            {loggedin ?
                <div className="flex justify-end items-center">
                    {userInfo!==undefined &&
                    <span className='font-bold text-[1.5rem] hover:underline'> {userInfo.name} </span>}

                    <button onClick={()=>{
                        removeCookies();
                    }} className="mx-5">Sign out</button>
                    <button onClick={()=>{
                        deleteUser();
                    }} className="duration-300 rounded-3xl py-2 px-3 text-white bg-[rgb(30,30,30)] hover:bg-black">Delete user</button>
                </div>
            :
            <div className="flex justify-end items-center">
                <button onClick={()=>{
                    router.push("/signin")
                }} className="mx-5">Sign in</button>
                <button onClick={()=>{
                    router.push("/register")
                }} className="duration-300 rounded-3xl py-2 px-3 text-white bg-[rgb(30,30,30)] hover:bg-black">Get started</button>
            </div>}

        </div>
    )
}

export default HomeHeader;