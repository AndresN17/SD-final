'use strict'
const { Membership } = require('../models');

exports.getMembership = async (req, res, next) => {
    try {
        const memberships = await Membership.findAll();
        if (!memberships) {
            const error = new Error("Memberships don't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ memberships: memberships });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getMembershipById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const membership = await Membership.findByPk(id);
        if (!membership) {
            const error = new Error("Membership doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({ membership: membership });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.createMembership = async (req, res, next) => {
    try {
        const { name, discount, fee, creditValue, isActive } = req.body;
        const newMembership = await Membership.create({
            name: name,
            discount: discount,
            fee: fee,
            creditValue: creditValue,
            isActive: isActive
        });
        res.status(201).json({ membership: newMembership });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.updateMembership = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, discount, fee, creditValue, isActive } = req.body;
        const membership = await Membership.findByPk(id);
        if (!membership) {
            const error = new Error("Membership doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        membership.name = name;
        membership.discount = discount;
        membership.fee = fee;
        membership.creditValue = creditValue;
        membership.isActive = isActive;
        await membership.save();

        res.status(201).json({ message: "Membership updated succesfully", membership: membership });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

};

exports.deleteMembresia = async (req, res, next) => {
    try {
        const { id } = req.params;
        const membership = await Membership.findByPk(id);
        if (!membership) {
            const error = new Error("Membership doesn't exist");
            error.statusCode = 401;
            throw error;
        }
        await membership.destroy();
        res.status(201).json({ messsage: "Resource deleted succesfully." });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};