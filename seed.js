import fetch from 'node-fetch';
import pokemonModel from './models/pokemon.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/pokedex', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "conenction error"));
db.once("open", () => {
    console.log("Database Connected!");
})

const fetchPokemon = async () => {
    try {
        for(let i = 0; i<50;i++){
            const rando = Math.floor(Math.random()*100) + 3;
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${rando}/`);
            const {name, sprites, types } = await data.json();
            const image = sprites.other.dream_world.front_default;
            const p =  new pokemonModel({
                name: name,
                image: image,
                types: types
            })
            const result = await p.save();
            console.log(p);
    }
    } catch (e){
        console.log(e);
    }
};

fetchPokemon();