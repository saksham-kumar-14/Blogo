import { TrashIcon } from '@heroicons/react/solid'

const Warning = ({ setShowLoginWarning , content }) => {
    return(
        <div className='flex items-center py-3 bg-red-500 fixed w-[100%] bottom-0'>
            <span className="font-bold text-black text-[1.5rem] w-[90%] flex items-center justify-center">{content}</span>
            <div className='flex justify-end w-[10%] pr-4'>
                <TrashIcon onClick={()=>{
                    setShowLoginWarning(false);
                }} className="w-[2rem] cursor-pointer"/>
            </div>
        </div>
    )
}

export default Warning;