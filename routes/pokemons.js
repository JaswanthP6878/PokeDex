import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';

import pokemonModel from '../models/pokemon.js';


import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

const AuthUser = (req, res, next) => {
    if(!req.session.userID){
        return res.send('access denied! Login into the pokedex'); 
    }
    next();
}

router.get('/search', AuthUser ,async (req, res) => {
    let { pokename } = req.query;
    pokename = pokename.toLowerCase()
    const pokemon = await pokemonModel.findOne({name : pokename});
    if(pokemon){
        res.redirect(`/pokemons/${pokemon._id}`);
    }
    else {
        res.render('notFound', { pokename });
    }
})

router.get('/', AuthUser,  async (req, res) => {
    const data = await pokemonModel.find();
    res.render('index', { data });
})

router.get('/:id', AuthUser, async (req, res) => {
    const { id } =  req.params;
    const pokemon = await pokemonModel.findById(id);
    const pokeData = await P.getPokemonByName(pokemon.name);
    // console.log(pokeData);
    res.render('show', { pokemon ,pokeData});
    // res.send(pokeData); testing the pokedata;
})

router.post('/:name', AuthUser,  async (req, res) => {
    try{
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}/`);
    const pokemon = await data.json();
    const {name, sprites, types } = pokemon;
    const image = sprites.other.dream_world.front_default;
    const p =  new pokemonModel({
        name: name,
        image: image,
        types: types
    })
    const result = await p.save();
    console.log(p);
    res.redirect(`/pokemons/${result._id}`);
    } catch(e) {
        res.send('not found');
    }   
})
export default router;