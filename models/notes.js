const mongoose = require('mongoose');

const notesShema = mongoose.Schema(
    {
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
       title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }
       }, { timestamps: true });

    module.exports = mongoose.model("notes", notesShema);