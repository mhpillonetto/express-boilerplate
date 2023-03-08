const Pokemon = require('../model/Pokemon');

const getAllPokemons = async (req, res) => {
    const pokemons = await Pokemon.find();
    if(!pokemons) return res.status(204).json({"message":"No pokemons found :("});
    res.json(pokemons)
};

const createPokemons = async (req, res) => {
    //adicionar validacao!!
    if (!req?.body?.name || !req?.body?.type) {
        return res.status(400).json({ "message": "name and type are required."})
    }

    try {
        const result = await Pokemon.create({
            name: req.body.name,
            type: req.body.type
        });

        res.status(201).json(result);

    } catch (error) {
        // throw new Error(err);
        console.error(err);
    }
};

const updatePokemon = async (req, res) => {
    //validacao
    if (!req?.body?.id) {
        return res.status(400).json({ "message": "pokemon id required."})
    }

    const pokemon = await Pokemon.findOne({_id: req.body.id}).exec();

    if (!pokemon) {
        return res.status(204).json({ "message": `No Pokemon matches ID ${req.body.id}`});
    }

    if (req.body?.name) pokemon.name = req.body.name;
    if (req.body?.type) pokemon.type = req.body.type;
    
    const result = await Pokemon.save();
    res.json(result);
};

const deletePokemon = async(req,res) => {    
    if(!req?.params?.id) {
        return res.status(400).json({ "message": `Pokemon ID required.`});
    }
    const result = await Pokemon.deleteOne({ _id: req.params.id });
    res.json(result);
};

const getPokemon = async (req,res) => {
    if(!req?.params?.id) {
        return res.status(400).json({ "message": `Pokemon ID required.`});
    }
    const pokemon = await Pokemon.findOne({ _id: req.params.id }).exec();
    res.json(pokemon);
};

module.exports = {
    getAllPokemons,
    createPokemons,
    updatePokemon,
    deletePokemon,
    getPokemon
};