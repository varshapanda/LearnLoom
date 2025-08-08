require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const learningPathRoutes = require('./routes/learningPathRoutes.js');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.get('/test', (req, res)=>{
    return res.status(200).send("Welcome to LearnLoom - Weaving your learning experience");
})

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/learningPaths', learningPathRoutes);


app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running on port : http://localhost:${PORT}`);
})