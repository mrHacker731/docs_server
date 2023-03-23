const mongoose = require("mongoose");

module.exports = async()=>{
    const mongo_url = process.env.MONGO_URL;
    await mongoose.connect(mongo_url,{
        useNewUrlParser: true, useUnifiedTopology: true,
    });
}