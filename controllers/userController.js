const User=require('../models/userBase');
const UserAsset=require('../models/userAsset');
const getUsers=async(req,res)=>{
    const limit=parseInt(req.query.limit);
    const page=parseInt(req.query.page);
    const skip=limit*(page-1);
    console.log(page,limit);

    //using aggregate
    const data=await User.aggregate([{$skip:skip},{$limit:limit},{$sort:{id:1}}])
    res.status(200).send(data);

    //using find()
    // const data=await User.find({}).skip(skip).limit(limit).sort({id:1});
    // res.status(200).send(data);

    //HardCoded Pagination //not recomended
    // if(page&&limit)
    // {
        //  Pagination http://localhost:9000/users?page=6&limit=7
        // const startIndex=(limit*(page-1));
        // const endIndex=(limit*page)-1;
        // const filteredData=data.filter((data,index)=>index>=startIndex&&index<=endIndex);
        // res.status(200).send(filteredData)
    // }
    // else
    // { 
    // res.status(200).send(data)
    // }
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
    const newUserAsset=new UserAsset({userId:currentCount?.id+1||1});
    await newUserAsset.save();
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
const getUserAsset=async(req,res)=>{
    const data=await UserAsset.find({});
    res.status(200).send(data);
}
const getCompleteDetails=async(req,res)=>{

    //Normal Lookup
    // const data=await User.aggregate([
    //     {
    //       $lookup: {
    //         from: "userassets", // the second collection
    //         localField: "id", // field from the 'users' collection
    //         foreignField: "userId", // corresponding field in 'userassets' collection
    //         as: "CompleteDetails" // field that will contain the joined data
    //       }
    //     }
    //   ]);


    //Let Lookup
    const data=await User.aggregate([
      {  
        $lookup:{
            from:"userassets",
            let:{userId:'$id'}, //from primary collection User
            pipeline:[
                {
                    $match:{$expr:{$eq:['$userId','$$userId']}}
                },
                {
                    $sort:{id:1}
                },
                {
                    $limit:2
                }
            ],
            as:"completeDetails"
        }}
    ])
      res.status(200).send(data);
}
module.exports={
    getUsers,
    getUserById,
    deleteUser,
    createUser,
    updateUser,
    getUserAsset,
    getCompleteDetails
}