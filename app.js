import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import engine from 'ejs-mate';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

mongoose.connect('mongodb://localhost:27017/pokedex', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "conenction error"));
db.once("open", () => {
    console.log("Database Connected!");
})
import pokemonModel from './models/pokemon.js';

app.get('/pokemons', async (req, res) => {
    const data = await pokemonModel.find();
    res.render('index', { data });
    // res.send('index page');
})

app.get('/pokemons/:id', async (req, res) => {
    const { id } =  req.params;
    const pokemon = await pokemonModel.findById(id);
    res.render('show', { pokemon });
})

app.listen(3000,  () =>{
    console.log('listening at 3000!');
})