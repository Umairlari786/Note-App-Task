const express = require("express");
const connectDB = require('./config/db');
const notesRoutes = require('./routes/notes');
//To store data in request.body i:e we use body-parser
const bodyParser = require("body-parser");

//to start express
const app = express();

const PORT = 3000;

//conection to mongoDB
connectDB();


//middleware
app.use(bodyParser.json());
//connected frontend
app.use(express.static('public'));
app.use('/notes', notesRoutes);


app.listen(PORT,()=>{
    console.log(`server is runing on${PORT}`);
})