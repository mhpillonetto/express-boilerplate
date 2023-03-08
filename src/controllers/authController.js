const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');


const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) return res.status(400).json({ "message": 'Username and password are required' });

    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return response.sendStatus(401); //unauthorized
    //evaluate password

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles)

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.password.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15min' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.password.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        //Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);

        //writes refreshToken on DB
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 14 * 60 * 60 * 1000 });
        res.json({ accessToken })
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };