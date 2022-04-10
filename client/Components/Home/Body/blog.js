import { ArrowRightIcon, UserIcon } from "@heroicons/react/solid";
import { useRouter } from 'next/router';

const HomeBodyBlog = ({ blog }) => {
    const router = useRouter();

    const slice_description = (desc) => {
        return desc.slice(0,250) + " ...."
    }
    
    return(
        <div className="flex flex-col justify-center rounded-lg border-gray-300 border-[0.1rem] py-2 px-4 my-4 cursor-pointer duration-300 hover:scale-105">
            <div className="flex items-center px-2 py-2">
                <UserIcon className="w-[2.5rem] bg-red-500 rounded-full" />
                <span className="text-[1.2rem] mx-4"> { blog.name } </span>
            </div>

            <h3 className="mx-2 font-semibold text-[1.7rem]">
                {blog.title}    
            </h3>
            <span className="mx-2 mt-3 text-gray-700 text-[0.95rem]">
                {slice_description(blog.content)}
            </span>

            <span className="mx-2 text-gray-700 text-[0.9rem] my-5">
                {blog.time}
            </span>

            <div className="flex justify-end py-2 px-4">
                <span onClick={()=>{router.push("/"+blog.id)}} className="flex hover:underline text-blue-700">
                    Read More <ArrowRightIcon className="mx-2 w-[0.9rem]"/>
                </span>
            </div>
        </div>
    )
}

export default HomeBodyBlog;