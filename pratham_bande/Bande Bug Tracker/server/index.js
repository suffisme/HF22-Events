const express = require('express');

const app = express();
app.use(express.json());

const cors = require('cors');  
// app.use(cors());
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://bandeBugTracker:BandeTracksBug@cluster0.d2ltj2p.mongodb.net/BugTrack?retryWrites=true&w=majority';
// const MONGODB_URI = 'mongodb+srv://bandeBugTracker:BandeTracksBug@cluster0.d2ltj2p.mongodb.net/BugTrack';
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri : MONGODB_URI,
    collection: 'sessions'
})
app.use(session({secret: 'my secrett ?? ', resave :false, saveUninitialized: false, store: store}));



const authRoutes = require('./routes/auth');
const bugRoutes = require('./routes/bug');
const userRoutes = require('./routes/user');

app.use(authRoutes);
app.use(bugRoutes);
app.use(userRoutes);


mongoose.connect(MONGODB_URI)
.then(result => {
    console.log('Connected');
    app.listen(8000);
}).catch(err => {
    console.log(err);
})