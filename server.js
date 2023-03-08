require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const verifyJWT = require('./src/middlewares/verifyJWT');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const connectDB = require('./src/config/dbConn')

connectDB();

//external middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//custom middleware example - logger
app.use((req,res,next) => {
    console.log(`${req.method} ${req.path}`);
    next();
})

app.use('/', require('./src/routes'));
app.use('/register', require('./src/routes/api/register'));
app.use('/auth', require('./src/routes/api/auth'));
app.use('/refresh', require('./src/routes/api/refresh'));
app.use('/logout', require('./src/routes/api/logout'));

//Everything under here will use jwt
app.use(verifyJWT);
app.use('/pokemons', require('./src/routes/api/pokemons'));

mongoose.connection.once('open', ()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
