require("dotenv").config();
const express = require("express");
const app = express();

const cors = require('cors');
const logger = require('./middleware/logger')
const MongoManager = require('./db/connect')
const userRoutes = require('./routes/user.Routes')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json())
app.use(logger)

app.use('/api/v1', userRoutes)

MongoManager.connectDB()
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});