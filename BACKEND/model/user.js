const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
        trim:true,
        minlengt:[2, "Name must be at least 2 characters"],
    },
    email:{
        type:String,
        unique:true,
        required:[true, "Email is required"],
        trim:true,
        lowercase:true,
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:[6, "Password must be at least 6 characters"]
    },
    profilePicture:{
        type:String,
        default:null
    },
    learningGoals:[{
        type:String,
        trim:true
    }],
    totalLearningPaths:{
        type:Number,
        default:0
    },
    completedLearningPaths:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, {
    timestamps:true
});

const User = mongoose.model('User', userSchema);
module.exports = User;