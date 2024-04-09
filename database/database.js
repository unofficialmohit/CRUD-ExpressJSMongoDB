const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mohitdb')
.then(()=>{
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
})
.catch((error)=>{
    console.log(error);
})
