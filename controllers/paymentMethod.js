'use strict'
const { PaymentMethod } = require('../models');


exports.getPaymentMethod = async (req, res, next) => {
    try {
        const paymentMethod = await PaymentMethod.findAll();
        if (!paymentMethod) {
            const error = new Error("Payment Method doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ paymentMethod: paymentMethod });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getPaymentMethodById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const paymentMethod = await PaymentMethod.findByPk(id);
        if (!paymentMethod) {
            const error = new Error("Payment Method doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ paymentMethod: paymentMethod });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.createPaymentMethod = async (req, res, next) => {
    try {
        const { name } = req.body;
        const paymentMethodExists = await PaymentMethod.findOne({ where: { name: name } });
        if (paymentMethodExists) {
            const error = new Error("Payment Method already exist");
            error.statusCode = 401;
            throw error;
        }
        const paymentMethod = await PaymentMethod.create({ name: name });
        res.status(201).json({ paymentMethod: paymentMethod });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.updatePaymentMethod = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const paymentMethod = await paymentMethod.findByPk(id);
        if (!paymentMethod) {
            const error = new Error("Payment method doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        paymentMethod.name = name;
        await paymentMethod.save();
        res.status(201).json({ message: "Payment method updated succesfully", paymentMethod: paymentMethod });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.deletePaymentMethod = async (req, res, next) => {
    try {
        const { id } = req.params;
        const paymentMethod = await PaymentMethod.findByPk(id);
        if (!paymentMethod) {
            const error = new Error("Payment Method doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        await paymentMethod.destroy();
        res.status(201).json({ messsage: "Resource deleted succesfully." });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
