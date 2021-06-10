const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
dotenv.config({path: './config.env'})
const PORT = process.env.PORT
const DB = process.env.DB
const colorRoute = require('./routes/colorRoute')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(()=>console.log("DB connection successful"))
    .catch((err)=> console.log("Error: "+ err.message))

app.get("/", (req,res)=>{
    res.send('Hello world')
})
app.use("/api/v1/colors",cors(),colorRoute)

app.listen(PORT,() => {
    console.log("Server run on port "+ PORT)
})
