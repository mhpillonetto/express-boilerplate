const data = {
    pokemons: require('../models/pokemons.json'),
    setPokemons: function (data) {this.pokemons = data} 
};

const getAllPokemons = (req, res) => {
    res.json(data.pokemons);
};

const createPokemons = (req, res) => {
    const newPokemon = {
        id: data.pokemons[data.pokemons.length -1].id + 1 || 1,
        name: req.body.name,
        type: req.body.type
    }
    //adicionar validacao!!

    console.log(newPokemon);
    
    data.setPokemons([...data.pokemons, newPokemon]);
    res.json(data.pokemons);
};

const updatePokemon = (req, res) => {
    const pokemon = data.pokemons.find(poke => poke.id === parseInt(req.body.id));
    if (!pokemon) {
        return res.status(400).json({ "message": `Pokemon ID ${req.body.id} not found`});
    }
    if (req.body.name) pokemon.name = req.body.name;
    if (req.body.type) pokemon.type = req.body.type;
    const filteredArray = data.pokemons.filter(poke => poke.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, pokemon];
    data.setPokemons(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < navigator.id ? -1 : 0));
    res.json(data.pokemons)
};

const deletePokemon = (req,res) => {    
    const filteredArray = data.pokemons.filter(poke => poke.id !== parseInt(req.headers.id));
    data.setPokemons(filteredArray);
    res.json(data.pokemons);
};

const getPokemon = (req,res) => {
    const pokemon = data.pokemons.find(poke => poke.id === parseInt(req.body.id));

    res.json(pokemon);
};

module.exports = {
    getAllPokemons,
    createPokemons,
    updatePokemon,
    deletePokemon,
    getPokemon
};