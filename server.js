const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.get('/', (req,res) => {
    res.send('Hello World!')
});

app.get('/users', (req,res) => {
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

app.get('/chain', [one, two, three]);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));