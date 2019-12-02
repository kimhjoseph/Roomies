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
const ObjectId = mongoose.Types.ObjectId;



// call all the required packages for images
const path = require('path');
const multer = require('multer');
app.use(bodyParser.urlencoded({extended: true}))
const GridFsStorage = require("multer-gridfs-storage");
const mongoURI = "mongodb+srv://prad:TaskrMongoDB@cluster0-n2wtn.mongodb.net/Roomies?retryWrites=true&w=majority";
const Grid = require("gridfs-stream");


// MongoDB Connection
let gfs;
mongoose.connect(
  "mongodb+srv://prad:TaskrMongoDB@cluster0-n2wtn.mongodb.net/Roomies?retryWrites=true&w=majority",
  { useNewUrlParser: true, useFindAndModify: false }
);
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "MongoDB connection error"));
connection.once("open", function() {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log("MongoDB database connection established successfully");

});

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
  session({
    key: "user_sid",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000
    }
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
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
// app.use('/event', eventRouter);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});



//Image stuff

 
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
      });
    }
  });
  
  const upload = multer({ storage });


  app.post('/upload', upload.single('img'), (req, res, err) => {

    let file = req.file;

    if (err) console.log(err);
    res.status(200).json(file);
    console.log("Success");
    
  })

  app.get('/upload/:filename', async function(req, res){
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists',
        })
      }
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename)
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image',
        })
      }
    })
  })

  app.get('/load_image/:fileid', async function(req, res){
    gfs.files.findOne({ _id: new ObjectId(req.params.fileid) }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists',
        })
      }
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename)
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image',
        })
      }
    })
  })

