const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(cors());

//custom middleware example - logger
app.use((req,res,next) => {
    console.log(`${req.method} ${req.path}`);
    next();
})

app.use('/', require('./routes'));
app.use('/register', require('./routes/api/register'));
app.use('/pokemons', require('./routes/api/pokemons'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));