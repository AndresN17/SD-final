'use strict'
const { Warehouse } = require('../models');
const { City } = require('../models');

exports.getWarehouse = async (req, res, next) => {
    try {
        const warehouses = await Warehouse.findAll({
            include: [{
                model: City,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "ProvinceId"],
                },
            }],
            attributes: {
                exclude: ["createdAt", "updatedAt", "CityId"],
            },
        });
        if (!warehouses) {
            const error = new Error("Warehouses don't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ warehouses: warehouses });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getWarehouseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const warehouse = await Warehouse.findByPk(id);
        if (!warehouse) {
            const error = new Error("Warehouse don't exist");
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({ warehouse: warehouse });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createWarehouse = async (req, res, next) => {
    try {
        const { name, address, city } = req.body;
        const warehouseExist = await Warehouse.findOne({ where: { name: name } });
        
        if (warehouseExist) {
            const error = new Error("Warehouse already exist");
            error.statusCode = 401;
            throw error;
        }
        const cityExist = await City.findOne({ where: { name: city.toLowerCase() } });

        const warehouse = await Warehouse.create({ name: name, address: address, cityId: cityExist.id });
        res.json({ warehouse: warehouse });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.updateWarehouse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, address } = req.body;
        const warehouseExist = await Warehouse.findByPk(id);
        if (!warehouseExist) {
            const error = new Error("Warehouse don't exist");
            error.statusCode = 401;
            throw error;
        }

        warehouseExist.name = name;
        warehouseExist.address = address;

        await warehouseExist.save();

        res.json({ message: "Warehouse updated succesfully", warehouse: warehouseExist });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}


exports.deleteWarehouse = async (req, res, next) => {
    try {

        const { id } = req.params;
        const warehouseExist = await Warehouse.findByPk(id);
        if (!warehouseExist) {
            const error = new Error("Warehouse don't exist");
            error.statusCode = 401;
            throw error;
        }

        await warehouseExist.destroy();

        res.status(201).json({ message: "Warehouse deleted succesfully" });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}