'use strict'
const { Province } = require('../models');


exports.getProvinces = async (req, res, next) => {
    try {
        const provinces = await Province.findAll();
        if (!provinces) {
            const error = new Error("Provinces don't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ provinces: provinces });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getProvinceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const province = await Province.findByPk(id);
        if (!province) {
            const error = new Error("Province doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ province: province });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.createProvince = async (req, res, next) => {
    try {
        const { name } = req.body;
        const provinceExist = await Province.findOne({ where: { name: name.toLowerCase() } });
        if (provinceExist) {
            const error = new Error("Province doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        const province = await Province.create({ name: name.toLowerCase() });
        res.status(201).json({ province: province });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.updateProvince = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const province = await Province.findByPk(id);
        if (!province) {
            const error = new Error("Province doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        province.name = name;
        await province.save();
        res.status(201).json({ message: "Province updated succesfully", province: province });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.deleteProvince = async (req, res, next) => {
    try {
        const { id } = req.params;
        const province = await Province.findByPk(id);
        if (!province) {
            const error = new Error("Province doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        await province.destroy();
        res.status(201).json({ messsage: "Resource deleted succesfully." });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};