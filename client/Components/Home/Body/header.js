

const HomeBodyHeader = ({ setWriting , loggedin , setShowLoginWarning , setWarningContent }) => {

    return(
        <div className="flex items-center my-6">
            <div className="font-semibold border-b-2 border-black">
                RECOMMENDED BLOGS
            </div>
            <button onClick={()=>{
                if(loggedin){
                    setWriting(true)
                }else{
                    setShowLoginWarning(true);
                    setWarningContent("You have to login first!")
                }
            }} className="mx-3 bg-green-500 rounded-lg font-semibold px-3 py-[0.2rem] duration-300 border-[0.125rem] border-black hover:bg-green-400">
                WRITE A BLOG
            </button>
        </div>
    )
}

export default HomeBodyHeader;