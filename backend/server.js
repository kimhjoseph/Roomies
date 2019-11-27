const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

// MongoDB Connection
mongoose.connect("mongodb+srv://prad:TaskrMongoDB@cluster0-n2wtn.mongodb.net/taskr?retryWrites=true&w=majority", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error'));
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// const facebookRouter = require('./routes/facebook_login');
// const googleRouter = require('./routes/google_login');
const userRouter = require('./routes/user');
const apartmentRouter = require('./routes/apartment');
const shoppingitemRouter = require('./routes/shoppingitem');
const choreitemRouter = require('./routes/choreitem');
const eventRouter = require('./routes/event');

app.use(cors());
app.use(bodyParser.json());
// app.use('/auth/facebook', facebookRouter);
// app.use('/auth/google', googleRouter);
app.use('/user', userRouter);
app.use('/apartment', apartmentRouter);
app.use('/shoppingitem', shoppingitemRouter);
app.use('/choreitem', choreitemRouter);
app.use('/event', eventRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});