import HomeBodyHeader from "./Body/header";
import HomeBodyBlog from "./Body/blog";

const HomeBody = ({ writing, setWriting , loggedin , setShowLoginWarning , blogs , setWarningContent }) => {

    return(
        <div className="py-3 px-16">
            <HomeBodyHeader setWriting={setWriting} loggedin={loggedin} 
            setShowLoginWarning={setShowLoginWarning} setWarningContent={setWarningContent} />

            {blogs.map((e,index)=>{
                return <HomeBodyBlog key={"blog"+index.toString()} blog={e} />
            })}

        </div>
    )
}

export default HomeBody;