const express=require('express');
const app=express();
const database=require('./database/database')
app.use(express.json());
const userRoutes=require('./routes/userRoutes')
app.use(userRoutes);
module.exports=app;