import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import engine from 'ejs-mate';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();


import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))

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