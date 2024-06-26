const mongoose= require('mongoose');
const userSchema=new mongoose.Schema({
    id:Number,
    username:String,
    email:{
        type:String,
        minLength:5,
    },
    age:{
        type:Number,
        min:18,
        max:100,
    },
    password:String
})
userSchema.index({username:'text',email:'text',password:'text'})
// userSchema.index({'$**': 'text'});
module.exports=mongoose.model("Users",userSchema);