const { log } = require('console');
const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("connected to MongoDB");
    })
    mongoose.connect(process.env.MONGO_URI)


}

module.exports = {connectDB}