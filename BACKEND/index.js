require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.get('/test', (req, res)=>{
    return res.status(200).send("Welcome to LearnLoom - Weaving your learning experience");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running on port : http://localhost:${PORT}`);
})