const mongoose = require("mongoose");

const connectDB= async()=>{
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/Our_Service', {useNewUrlParser: true, useUnifiedTopology: true 
          
            });

        console.log("Mongodb connected successfully");
    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;
