const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    console.log('found user', foundUser);
    if (!foundUser) return response.sendStatus(403); //unauthorized
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15min'}
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }