'use strict'
const { City } = require('../models');
const { Province } = require('../models');


exports.getCities = async (req, res, next) => {
    try {
        const cities = await City.findAll({
            include:[
                {
                    model: Province,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "ProvinceId"],
                    },
                }
            ]
        });
        if (!cities) {
            const error = new Error("There is no citys");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ cities: cities });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getCityById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const city = await City.findByPk(id);
        if (!city) {
            const error = new Error("City doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ city: city });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.createCity = async (req, res, next) => {
    try {
        const { name, acronym, provinceId } = req.body;
        const city = await City.create({
            name: name.toLowerCase(),
            acronym: acronym.toUpperCase(),
            provinceId: provinceId
        });
        res.status(201).json({ city: city });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.updateCity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, acronym } = req.body;
        const city = await City.findByPk(id);
        if (!city) {
            const error = new Error("City doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        city.name = name;
        city.acronym = acronym;
        await city.save();

        res.status(201).json({ message: "City updated sucessfully", city: city });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteCity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const city = await City.findByPk(id);
        if (!city) {
            const error = new Error("City doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        await city.destroy();
        res.status(200).json({ message: "Resource deleted succesfully" });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};