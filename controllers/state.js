'use strict'
const { State } = require('../models');


exports.getStates = async (req, res, next) => {
    try {
        const states = await State.findAll();
        if (!states) {
            const error = new Error("States doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ states: states });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getStateById = async (req, res, next) => {
    try {
        const { id } = req;
        const state = await State.findByPk(id);
        if (!state) {
            const error = new Error("State doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ state: state });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.createState = async (req, res, next) => {
    try {
        const { name } = req.body;
        const stateExist = await State.findOne({ where: { name: name } });
        if (stateExist) {
            const error = new Error("State already exist");
            error.statusCode = 401;
            throw error;
        }
        const state = await State.create({ name: name });
        res.status(201).json({ state: state });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.updateState = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const state = await State.findByPk(id);
        if (!state) {
            const error = new Error("State doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        state.name = name;
        await state.save();
        res.status(201).json({ message: "State updated succesfully", state: state });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.deleteState = async (req, res, next) => {
    try {
        const { id } = req.params;
        const state = await State.findByPk(id);
        if (!state) {
            const error = new Error("State doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        await state.destroy();
        res.status(201).json({ messsage: "Resource deleted succesfully." });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
