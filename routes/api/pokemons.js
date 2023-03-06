const express= require('express');
const router = express.Router();
const path = require('path');
const pokemonsController = require('../../controllers/pokemonsController');

router.route('/')
    .get(pokemonsController.getAllPokemons)
    .post(pokemonsController.createPokemons)
    .put(pokemonsController.updatePokemon);

router.route("/:id")
    .get(pokemonsController.getPokemon)
    .delete(pokemonsController.deletePokemon);


module.exports = router;
