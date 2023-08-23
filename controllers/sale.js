'use strict'
const Sale = require('../models/sale');


exports.getSales = async (req, res, next) => {
    try {
        const sales = await Sale.findAll();
        if (!sales) {
            const error = new Error("Sales don't exist");
            error.statusCode = 401;
            throw error
        }
        res.status(200).json({ sales: sales });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getSaleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sale = await Sale.findByPk(id);
        if (!sale) {
            const error = new Error("Sale doesn't exist");
            error.statusCode = 401;
            throw error
        }
        res.status(200).json({ sale: sale });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getSalesByUserId = async (req, res, next) => {
    try {
        const { userId } = req;
        const salesByUserExists = await Sale.findAll({ where: { userId: userId } });
        if (!salesByUserExists) {
            const error = new Error("Sales don't exist");
            error.statusCode = 401;
            throw error
        }
        res.status(200).json({ sale: salesByUserExists });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createSale = async (req, res, next) => {
    try {
        const { userId, subtotal, taxes, total, paymentMethodId } = req;
        //Agregar validaciones
        const sale = await Sale.create({
            userId: userId,
            subtotal: subtotal,
            taxes: taxes,
            total: total,
            paymentMethodId: paymentMethodId
        });
        res.json({ message: "Sale created sucessfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateSaleState = async (req, res, next) => {
    try {
        const { id, saleStateId } = req;
        const saleExists = await Sale.findByPk(id);
        if (!saleExists) {
            const error = new Error("Sales don't exist");
            error.statusCode = 401;
            throw error
        }
        saleExists.stateId = stateId;
        await saleExists.save();
        res.status(201).json({ message: "Sale status updated succesfully" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}