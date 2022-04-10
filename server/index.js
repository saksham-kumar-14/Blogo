const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const user_model = require("./models/user");
const blog_model = require("./models/blog");

mongoose.connect("mongodb+srv://Saksham:saksham@cluster0.mouvw.mongodb.net/blogo?retryWrites=true&w=majority")

app.use(express.json());
app.use(cors());

app.post("/login" , async (req,res)=>{
    const user = await user_model.findOne({
        email : req.body.email,
        password : req.body.password
    });

    if(user){
        const token = jwt.sign({
            name : user.name,
            email : user.email,
            password : user.password,
            blogs : user.blogs
        }, "secret");
        return res.json({ status:"ok" , user:token });
    }else{
        return res.json({ status:404 , user:false });
    }
})

app.get("/getUsers",(req,res)=>{
    user_model.find({}, (err,result)=>{
        if(err){
            console.log("ERROR OCCURED!")
            res.json(err)
        }
        else{
            console.log("WORKED SUCCESSFULLY!")
            res.json(result)
        }
    })
})

app.post("/createUser",async (req,res)=>{
    const user = req.body;
    const new_user = new user_model(user);
    await new_user.save();

    res.json(user)
})

app.get("/getBlogs", (req,res)=>{
    blog_model.find({} , (err,result)=>{
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    });

})

app.post("/createBlog" , async(req,res)=>{
    const blog = new blog_model(req.body);
    await blog.save();

    res.json(blog)
})

app.post("/deleteUser" , async(req,res)=>{
    await user_model.deleteOne(
        {email : req.body.email , password:req.body.password}
    ).then(()=>{
        return res.json({ status:"ok" })
    }).catch(()=>{
        return res.json({ status:404 })
    })
})

app.post("/deleteBlog" , async(req,res)=>{
    await blog_model.deleteOne(
        {id : req.body.id}
    ).then(()=>{
        return res.json({ status:"ok" })
    }).catch(()=>{
        return res.json({ status:404 })
    })
});

app.get("/api/login", async(req,res)=>{
    const token = req.headers["user-info"];

    try{
        const decoded = jwt.verify(token, "secret");
        const user = await user_model.findOne({ email:decoded.email, password:decoded.password });
        if(user){
            return res.json({ status:"ok" , userExists:true })
        }else{
            return res.json({ status:404 , userExists:true })
        }
    }catch{
        return res.json({ stauts:404 , userExists:false })
    }

})


app.listen(3001 , ()=>{
    console.log("Server is listening at http://localhost:3001")
})