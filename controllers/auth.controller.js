const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        const passwordResult = bcryptjs.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, config.jwt, { expiresIn: 60 * 60 });

            res.status(200).json({
                token: `Bearer ${token}`,
            });
        } else {
            res.status(401).json({
                message: 'Email or password doest not match',
            });
        }
    } else {
        res.status(404).json({
            message: 'User not found',
        });
    }
};

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        res.status(409).json({
            message: 'Email already exist',
        });
    } else {
        const salt = bcryptjs.genSaltSync(10);
        const { password } = req.body;
        const user = new User({
            email: req.body.email,
            password: bcryptjs.hashSync(password, salt),
        });

        try {
            await user.save();
            res.status(201).json({ user });
        } catch (error) {
            errorHandler(res, error);
        }
    }
};
