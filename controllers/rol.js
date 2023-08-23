'use strict'
const { Rol } = require('../models');

exports.getRols = async (req, res, next) => {
    try {
        const rols = await Rol.findAll();
        if (!rols) {
            const error = new Error('There is no rols');
            error.statusCode = 400;
            throw error;
        }

        res.status(200).json({ rols: rols });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            throw err;
        }
        next(err);
    }
};

exports.getRolById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rol = await Rol.findByPk(id);
        if (!rol) {
            const error = new Error("Rol doesn't exists.");
            error.statusCode = 400;
            throw error;
        }

        res.status(200).json({ rol: rol });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            throw err;
        }
        next(err);
    }
}

exports.createRol = async (req, res, next) => {
    try {
        const { name } = req.body;
        const rolExist = await Rol.findOne({ where: { name: name } });
        if (rolExist) {
            const error = new Error('Rol already exists.');
            error.statusCode = 400;
            throw error;
        }
        const rol = await Rol.create({ name: name });
        res.status(201).json({ message: "rol created succesfully", rol: rol });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            throw err;
        }
        next(err);
    }

};

exports.updateRol = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const rolExist = await Rol.findByPk(id);
        if (!rolExist) {
            const error = new Error("Rol doesn't exist");
            error.statusCode = 400;
            throw error;
        }

        rolExist.name = name;
        await rolExist.save();

        res.status(200).json({ message: "Rol updated succesfully", rol: rolExist });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            throw err;
        }
        next(err);
    }
}

exports.deleteRol = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rolExist = await Rol.findByPk(id);
        if (!rolExist) {
            const error = new Error("Rol doesn't exist");
            error.statusCode = 400;
            throw error;
        }

        await rolExist.destroy();

        res.status(200).json({ message: "Rol deleted" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            throw err;
        }
        next(err);
    }
}