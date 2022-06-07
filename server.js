require('dotenv').config(); // Load ENV Variables
const express = require('express'); // import express
const morgan = require('morgan'); //import morgan
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const vampire = require('./models/vampire');

//! Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require('liquid-express-views')(express(), {
  root: [path.resolve(__dirname, 'views/')],
});

/////////////////////////////////////////////////////
//! Middleware
/////////////////////////////////////////////////////
app.use(morgan('dev')); //? logging
app.use(methodOverride('_method')); //? override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); //? parse urlencoded request bodies
app.use(express.static('public')); //? serve files from public statically

/////////////////////////////////////////////
//! Database Connection
/////////////////////////////////////////////
//? Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//? Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

//? Events for when connection opens/disconnects/errors
mongoose.connection
  .on('open', () => console.log('Connected to Mongoose'))
  .on('close', () => console.log('Disconnected from Mongoose'))
  .on('error', (error) => console.log(error));

/////////////////////////////////////////////////
