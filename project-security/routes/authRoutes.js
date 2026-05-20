const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    try {

        const { username, email, password, chessSequence } = req.body;

        // Encrypts password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // Creates user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            chessSequence
        });

        await user.save();

        res.json({
            message: 'User registered successfully'
        });

    } catch (err) {

        res.status(500).json(err);

    }

});


router.post('/login', async (req, res) => {

    try {

        const { email, chessSequence } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        // Compare chess sequence
        const savedSequence = JSON.stringify(user.chessSequence);

        const loginSequence = JSON.stringify(chessSequence);

        if (savedSequence !== loginSequence) {

            return res.status(401).json({
                message: 'Wrong chess sequence'
            });

        }

        // Create JWT Token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            message: 'Login successful'
        });

    } catch (err) {

        res.status(500).json(err);

    }

});

module.exports = router;