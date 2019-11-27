const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

// MongoDB Connection
const url1 = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/users';
const url2 = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apartments';
const url3 = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/choreitems';
const url4 = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shoppingitems';
const url5 = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/events';

mongoose.connect(url1, { useNewUrlParser: true });
mongoose.connect(url2, { useNewUrlParser: true });
mongoose.connect(url3, { useNewUrlParser: true });
mongoose.connect(url4, { useNewUrlParser: true });
mongoose.connect(url5, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const facebookRouter = require('./routes/facebook_login');
const googleRouter = require('./routes/google_login');
const userRouter = require('./routes/user');
const apartmentRouter = require('./routes/apartment');
const shoppingitemRouter = require('./routes/shoppingitem');
const choreitemRouter = require('./routes/choreitem');
const eventRouter = require('./routes/event');

app.use(cors());
app.use(bodyParser.json());
app.use('/auth/facebook', facebookRouter);
app.use('/auth/google', googleRouter);
app.use('/user', userRouter);
app.use('/apartment', apartmentRouter);
app.use('/shoppingitem', shoppingitemRouter);
app.use('/choreitem', choreitemRouter);
app.use('/event', eventRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});