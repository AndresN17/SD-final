'use strict'
const { User } = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array() });
        }

        const { email, firstName, lastName, password, address, rolId, membershipId } = req.body;
        const userExist = await User.findOne({ where: { email: email } });
        if (userExist) {
            const error = new Error('Email already in use with another user.');
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const user = await User.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            address: address,
            rolId: rolId,
            membershipId: membershipId
        });
        res.status(201).json({ message: 'User created succesfully', user: { email: user.email, name: user.name } });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            throw err;
        }
        next(err);
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email }, include: "Rol" });
        if (!user) {
            const error = new Error("User with this email doesn't exist.");
            error.statusCode = 401;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Failed to authenticate");
            error.statusCode = 401;
            throw error;
        }

        const SECRET = process.env.SECRET;
        const token = jwt.sign({
            email: user.email,
            userId: user.id,
        }, SECRET, { expiresIn: '1h' });


        res.status(200).json({ token: token, user: user });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            throw err;
        }
        next(err);
    }
}