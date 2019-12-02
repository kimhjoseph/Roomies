const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;

//New
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);


// MongoDB Connection
mongoose.connect(
  "mongodb+srv://prad:TaskrMongoDB@cluster0-n2wtn.mongodb.net/Roomies?retryWrites=true&w=majority",
  { useNewUrlParser: true, useFindAndModify: false }
);
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "MongoDB connection error"));
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(session({
    key: 'user_sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// const facebookRouter = require('./routes/facebook_login');
// const googleRouter = require('./routes/google_login');
const userRouter = require("./routes/user");
const apartmentRouter = require("./routes/apartment");
const shoppingitemRouter = require("./routes/shoppingitem");
const choreitemRouter = require("./routes/choreitem");
const eventRouter = require("./routes/event");


// app.use('/auth/facebook', facebookRouter);
// app.use('/auth/google', googleRouter);
app.use("/user", userRouter);
app.use("/apartment", apartmentRouter);
app.use("/shoppingitem", shoppingitemRouter);
app.use("/choreitem", choreitemRouter);
app.use("/event", eventRouter);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
