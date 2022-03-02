const mongoose=require("mongoose");
const validator=require("validator");
//Defininbg Scheme
const studentData= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:3,
        }
        ,
        
            email:{
                type:String,
                required:true,
                unique:[true,"Email id already presesnt"],
                validate(value)
                {
                    if(!validator.isEmail(value))
                    {
                        throw new Error("Invalid Email")
                    }
                }
            },
            phone:
            {
                type:Number,
               
                required:true,
                unique:true,
            },


            address:{
                type:String,
                required:true,

            }
        
    });



    //Creating Collections
    const Students=new mongoose.model('studentData',studentData);

    module.exports=Students;