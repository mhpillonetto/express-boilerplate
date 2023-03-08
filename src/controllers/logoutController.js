const User = require('../model/User');

const handleLogout = async (req, res) => {
    //On client, also delete the access token

    const cookies = req.cookies;
    if (!cookies || !cookies.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    //Is RefreshToken in DB?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }
    
    //Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true }); //PROD > secure: true - only serves on https
}

module.exports = { handleLogout }