const express= require('express');
const router = express.Router();
const path = require('path');
const pokemonsController = require('../../controllers/pokemonsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middlewares/verifyRoles');

router.route('/')
    .get(pokemonsController.getAllPokemons)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pokemonsController.createPokemons)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), pokemonsController.updatePokemon);

router.route("/:id")
    .get(pokemonsController.getPokemon)
    .delete(verifyRoles(ROLES_LIST.Admin), pokemonsController.deletePokemon);

module.exports = router;
