const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:[true, 'Learning path title is required'],
        trim:true,
        maxLength:[200, 'Title cannot be more than 200 characters'],
    },
    description:{
        type:String,
        required:[true, 'Description is required'],
        trim:true,
        maxLength:[1000, 'Description cannot exceed 1000 characters']
    },
    difficulty:{
        type:String,
        enum:['beginner', 'intermediate', 'advanced'],
        default:'beginner'
    },
    estimatedDuration:{
        type:String,
        required:true,
        default:'4 weeks'
    },
    steps:[{
        stepNumber:{
            type:Number,
            required:true
        },
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        estimatedHours:{
            type:Number,
            default:2,
            min:0.5,
            max:100
        },
        completed:{
            type:Boolean,
            default:false
        },
        resources:[{
            type:String,
            trim:true
        }],
        completedAt:{
            type:Date
        }
    }],
    totalSteps:{
        type:Number,
        default:0
    },
    completedSteps:{
        type:Number,
        default:0
    },
    progressPercentage:{
        type:Number,
        default:0,
        min:0,
        max:100
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
}, {
    timestamps:true
});

learningPathSchema.pre('save', function(next){
    if(this.steps && this.steps.length>0){
        this.totalSteps = this.steps.length;
        this.completedSteps = this.steps.filter(step=>step.completed).length;
        this.progressPercentage = Math.round((this.completedSteps/this.totalSteps)*100);
        this.isCompleted = this.completedSteps === this.totalSteps;
    }
    next();
});

const LearningPath = mongoose.model('LearningPath', learningPathSchema);
module.exports = LearningPath;

