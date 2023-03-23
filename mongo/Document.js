const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    _id:{
        type:String,
    },
    data:Object,
},{timestamps:true});
module.exports = mongoose.model("Document",documentSchema);