import mongoose from 'mongoose';

const PokemonSchema = new mongoose.Schema({
    name: String,
    image: String,
    types: []
});

const pokemonModel = mongoose.model('Pokemon', PokemonSchema); 

export default pokemonModel;