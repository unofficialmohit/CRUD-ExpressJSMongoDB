const app=require('./app');
const PORT=9000;
app.listen(PORT,()=>{
    console.log("SERVER IS RUNNING AT " + PORT);
})