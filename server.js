const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const router = require('./src/router');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(cors());

//custom middleware example - logger
app.use((req,res,next) => {
    console.log(`${req.method} ${req.path}`);
    next();
})

app.use(router);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));