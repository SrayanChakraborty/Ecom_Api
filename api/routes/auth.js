const router = require('express').Router();
const User = require('../models/User.js');
const CryptoJs = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')

router.post("/register", async (req, res) => {
    const newuser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        }
    );
    try {
        const saveduser = await newuser.save();
        res.status(200).json(saveduser);

    } catch (err) {
        res.status(400).json(err);
    }

})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json('User not found!!');

        const hashedpassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
        const password = hashedpassword.toString(CryptoJs.enc.Utf8);

        password !== req.body.password && res.status(400).json("password incorrect");

        const accesstoken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        res.status(200).json({ user, accesstoken });
    }
    catch (err) {
        res.status(400).json(err);
        
    }
})

module.exports = router; 