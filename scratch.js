import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();
const fetchPokemon = async () => {
    // import Pokedex from 'pokedex-promise-v2';
    try {
    const data = await P.getPokemonByName('ivysaur');
    const {stats } = data;
    console.log(stats);
    } catch(e) {
        console.log(e);
    } 
}
fetchPokemon();