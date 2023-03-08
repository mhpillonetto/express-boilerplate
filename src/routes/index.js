const express = require('express');
const path = require( 'path');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello World!')
});

router.get('/users', (req,res) => {
    res.send('Hello users')
});

//Middleware example
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

router.get('/chain', [one, two, three]);

module.exports = router;
