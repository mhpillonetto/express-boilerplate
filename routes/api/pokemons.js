const express= require('express');
const router = express.Router();

const data = {};
data.pokemons = require('../../data/pokemons.json')

router.route('/')
    .get((req,res) => {
        res.json(data.pokemons);
    })
    .post((req, res) => {
        res.json({
            "name": req.body.name,
            "type": req.body.type
        });
    })
    .put((req, res) => {
        res.json({
            "name": req.body.name,
            "type": req.body.type
        });
    })
    .delete((req,res) => {
        res.json({ "id": req.body.id });
    });

router.route("/:id")
    .get((req,res) => {
        res.json({ "id": req.params.id });
    });


module.exports = router;
