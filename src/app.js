//POST REQUEST HANDLE API

const express=require("express");
const res = require("express/lib/response");
const { createRoutesFromChildren } = require("react-router-dom");
const app=express();
require("./db/conn");
const Student=require("./models/students");
const port=process.env.Port ||2709;
app.use(express.json())
app.get("/",(req,resp)=>
{
    resp.send("Hello from server");
})


app.post("/students",(req,resp)=>
{
resp.send("Student regestration");
console.log(req.body);
const  user=new Student(req.body);
user.save().
then(()=>{console.log("DAta saved"); resp.status(201).send(user)})
.catch((err)=>{
    resp.status(400).send(err);
    console.log(err)});
});



//USING ASYNC AWAIT 
app.post("/register",async(req,resp)=>
{
    try{
const user=new Student(req.body);
const createUser=await user.save();
resp.status(200).send(createUser);
console.log(req.body);
    }
    catch(err)
    {
        resp.status(400).send(err);
    }
})

//READ  ALLL THE DATA OF REGISTERED STUDENT




app.get("/students",async(req,resp)=>
{
    try{
const userData= await  Student.find();
resp.status(200).send(userData);
    }
    catch(e)
    {
resp.status(400).send(e);
    }
})




// FETCHING INDIVIDUAL DATA 



app.get("/students/:id",async(req,resp)=>
{
    try{
const _id=req.params.id;
console.log(req.params.id)
 const studentData= await Student.find({_id});
 if(!studentData)
 {
 return resp.status(400).send("DATA NOT FOUND")

}
else
{
    resp.send(studentData)
}
    }
    catch(err)
    {
resp.send(err)
    }
})

// DELETE USER 

app.delete("/students/:id",async(req,resp)=>
{
try
{
const deleteData=await Student.findByIdAndDelete(req.params.id);
if(!req.params.id)
{
return resp.status(400).send("ENTER VALID ID");
}
resp.send(deleteData);
console.log("DATA DELETEED")
}catch(err)
{
resp.status(500).send(err)
}
});





//UPDATE API 
//update student by id
app.patch("/students/:id",async(req,resp)=>
{
try{
    const updateStudent=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true});
resp.send(updateStudent);
console.log("UPDATED")
}catch(err)
{
    resp.status(400).send();
}
})

app.listen(port,()=>{console.log(":Port is running")});

