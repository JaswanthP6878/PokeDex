import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import engine from 'ejs-mate';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import flash from 'connect-flash'
import session from 'express-session';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();


import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

// config
const sessionConfig = {
    secret : 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie : {
        httpOnly: true,
        expires : Date.now() + 1000*60*60*24*7,
        maxAge : 1000*60*60*24*7
    }
}
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session(sessionConfig));
app.use(flash());

app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userID
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
  })

mongoose.connect('mongodb://localhost:27017/pokedex', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "conenction error"));
db.once("open", () => {
    console.log("Database Connected!");
})
import pokemonModel from './models/pokemon.js';
import pokemon from './routes/pokemons.js';
import user from './routes/user.js';

// home page:
app.get('/', (req, res) => {
    res.render('home');
})
app.use('/pokemons', pokemon);
app.use('/user', user);


app.listen(3000,  () =>{
    console.log('listening at 3000!');
})