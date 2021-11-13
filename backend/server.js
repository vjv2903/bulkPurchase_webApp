const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
global.__root   = __dirname + '/'; 

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints
let AuthController = require(__root + 'routes/auth/AuthController');
app.use('/api/auth', AuthController);
// Getting all the users
let ProductController = require(__root + 'routes/ProductController');
app.use('/api', ProductController);


app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
