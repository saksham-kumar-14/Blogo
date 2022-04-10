import { ClipboardListIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router';

const HomeSubHeader = ({ loggedin }) => {
    const router = useRouter();

    return(
        <div className='grid grid-cols-2 border-b-[0.125rem] border-t-[0.125rem] border-black pt-16'>
            <div className='flex flex-col justify-center py-2 pl-16'>
                <span className='text-[4rem] font-serif'>Blogo is a place to write, read, and connect</span>
                <span className='text-gray-700 font-semibold text-[1.15rem]'>It's easy and free to post your thinking on any topic and connect with millions of readers.</span>
                { !loggedin && <div className='flex justify-start'>
                    <button onClick={()=>{
                        router.push("/register")
                    }} className='border-[0.1rem] py-2 px-3 rounded-3xl mx-2 my-4 bg-white border-black'>Get started</button>
                </div>   }
            </div>
            <div className='flex items-center justify-center'>
                <ClipboardListIcon className='w-[60%] text-gray-700' />
            </div>
        </div>
    )
}

export default HomeSubHeader;