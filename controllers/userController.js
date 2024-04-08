const userBase=require('../models/userBase');
const getUsers=(req,res)=>{
    res.status(200).send(
        userBase
    )
}
const getUserById=(req,res)=>{
    const id=req.params.id;
    const indexToFind=userBase.indexOf(userBase.find((data)=>data.id==id))
    if(indexToFind==-1){
        res.status(400).send({message:"USER NOT FOUND"});
    }
    res.status(200).send(
        userBase[indexToFind]
    )
}
const createUser=(req,res)=>{
    const {id,username,password,email}=req.body;
    userBase.push({id:userBase.length+1,username,password,email})
    res.json(userBase)
}
const deleteUser=(req,res)=>{
    const id=req.params.id;
const userToDelete=userBase.find((user)=>user.id==id);
const indexToDelete=userBase.indexOf(userToDelete);
if(indexToDelete==-1)
{
    res.status(400).send({message:"User Not Found"})
}
userBase.splice(indexToDelete,1);
res.json(userBase);
}
const updateUser=(req,res)=>{
    const id=req.params.id;
const {username,email,password}=req.body;
const userToUpdate=userBase.find((user)=>user.id==id);
const indexToUpdate=userBase.indexOf(userToUpdate);
if(indexToUpdate==-1)
{
    res.status(400).send({message:"User Not Found"})
}
const updatedUserData={
    ...userBase[indexToUpdate],
    username:username||userBase[indexToUpdate].username,
    password:password||userBase[indexToUpdate].password,
    email:email||userBase[indexToUpdate].email,
    
}
userBase[indexToUpdate]=updatedUserData;
res.json(userBase);
}
module.exports={
    getUsers,
    getUserById,
    deleteUser,
    createUser,
    updateUser
}