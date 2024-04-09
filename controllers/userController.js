const User=require('../models/userBase')
const getUsers=async(req,res)=>{
   
    console.log(limit);
    const data=await User.find({}).sort({id:1});
    res.status(200).send(data)
    //todo
    // pagination
    // normal lookup
    // let lookup
}
const getUserById=async(req,res)=>{
    const id=req.params.id;
    const currentUser=await User.findOne({id})
    if(currentUser==null){
        res.status(400).send({message:"USER NOT FOUND"});
    }
    else{
    res.status(200).send(
        currentUser
    )
}
}

const createUser=async(req,res)=>{
    const {username,password,email,age}=req.body;
    try{  
    const currentCount=(await User.findOne({}).sort({id:-1}));
    const newUser=new User({id:currentCount?.id+1||1,username,email,age,password});
    await newUser.save();
    console.log(currentCount)
    }
    catch(error){
        return res.status(400).send({ message: error.message })
    }
   
    res.json(await User.find({}).sort({id:1}));
}
const deleteUser=async(req,res)=>{
const id=req.params.id;
await User.deleteMany({id});
res.json(await User.find({}).sort({id:1}));
}
const updateUser=async(req,res)=>{
const id=req.params.id;

// const currentUser=await User.findOneAndUpdate({id:id}, req.body,{new:true});

const {username,email,password,age}=req.body;
try{
const currentUser=await User.findOne({id:id});
if(currentUser)
{
currentUser.age=age||currentUser.age;
currentUser.username=username||currentUser.username;
currentUser.email=email||currentUser.email;
currentUser.password=password||currentUser.password;
await currentUser.save();
}
else
{
return res.status(400).send({ message: "User Not Found" });
}
}
catch(error){
    return res.status(400).send({ message: error.message })
}


res.json(await User.find({}).sort({id:1}));
}
module.exports={
    getUsers,
    getUserById,
    deleteUser,
    createUser,
    updateUser
}