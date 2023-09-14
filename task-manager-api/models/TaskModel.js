const mongoose = require("mongoose");

const TaskSchema  = new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Enter name"],
        trim: true,
        maxLength:[20,"Must be less than 20 characters"]
    },
    isCompleted : {
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model("tasks",TaskSchema);