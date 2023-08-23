'use strict'
const { User } = require('../models');
const { Rol } = require('../models');
const { Membership } = require('../models');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');


exports.getUsers = async (req, res, next) => {
    try {

        const { email, nombres, apellidos } = req.query;

        let users;

        if (email && !nombres && !apellidos) {
            users = await User.findAll({
                where: {
                    email: {
                        [Op.substring]: email,
                    }
                },
                attributes: {
                    exclude: ["RolId", "createdAt", "updatedAt", "MembershipId"],
                },
                include: [
                    {
                        model: Rol,
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"],
                        },
                    }
                ]
            });
        } else if (email && nombres && !apellidos) {
            users = await User.findAll({
                where: {
                    email: {
                        [Op.substring]: email,
                    }, firstName: {
                        [Op.substring]: nombres
                    }
                },
                attributes: {
                    exclude: ["RolId", "createdAt", "updatedAt", "MembershipId"],
                },
                include: [
                    {
                        model: Rol,
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"],
                        },
                    }
                ]
            });
        } else if (email && nombres && apellidos) {
            users = await User.findAll({
                where: {
                    email: {
                        [Op.substring]: email
                    }, firstName: {
                        [Op.substring]: nombres
                    }, lastName: {
                        [Op.substring]: apellidos
                    }
                },
                attributes: {
                    exclude: ["RolId", "createdAt", "updatedAt", "MembershipId"],
                },
                include: [
                    {
                        model: Rol,
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"],
                        },
                    }
                ]
            });

        } else if (!email && nombres && !apellidos) {
            users = await User.findAll({
                where: {
                    firstName: {
                        [Op.substring]: `${nombres}`
                    }
                },
                attributes: {
                    exclude: ["RolId", "createdAt", "updatedAt", "MembershipId"],
                },
                include: [
                    {
                        model: Rol,
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"],
                        },
                    }
                ]
            });
        } else if (!email && !nombres && apellidos) {
            users = await User.findAll({
                where: {
                    lastName: {
                        [Op.substring]: apellidos
                    }
                },
                attributes: {
                    exclude: ["RolId", "createdAt", "updatedAt", "MembershipId"],
                },
                include: [
                    {
                        model: Rol,
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"],
                        },
                    }
                ]
            });
        } else if (!email && nombres && apellidos) {
            users = await User.findAll({
                where: {
                    firstName: {
                        [Op.substring]: nombres
                    }, lastName: {
                        [Op.substring]: apellidos
                    }
                },
                attributes: {
                    exclude: ["RolId", "createdAt", "updatedAt", "MembershipId"],
                },
                include: [
                    {
                        model: Rol,
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"],
                        },
                    }
                ]
            });
        } else {
            users = await User.findAll({
                attributes: {
                    exclude: ["RolId", "createdAt", "updatedAt", "MembershipId"],
                },
                include: [
                    {
                        model: Rol,
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"],
                        },
                    }
                ]
            });
        }

        if (!users) {
            const error = new Error("Users don't exist");
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({ users: users });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            const error = new Error("User doesn't exist");
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({ user: user });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createUser = async (req, res, next) => {
    try {

        const { email, firstName, lastName, password, address, rol } = req.body;
        const userExist = await User.findOne({ where: { email: email } });
        if (userExist) {
            const error = new Error('Email already in use with another user.');
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 13);

        const rolExist = await Rol.findOne({ where: { name: rol } });
        if (!rolExist) {
            const error = new Error("Rol doesn't exist");
            error.statusCode = 401;
            throw error;
        }

        /* const membershipExist = await Membership.findOne({ where: { name: membership } });
        if (!membershipExist) {
            const error = new Error("Rol doesn't exist");
            error.statusCode = 401;
            throw error;
        } */

        const user = await User.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            address: address,
            rolId: rolExist.id,
            membershipId: 1
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

exports.editUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            email,
            password,
            address,
            rol,
        } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            const error = new Error("User doesn't exist");
            error.statusCode = 401;
            throw error;
        }

        const rolExist = await Rol.findOne({ where: { name: rol } });
        if (!rolExist) {
            const error = new Error("Rol doesn't exist");
            error.statusCode = 401;
            throw error;
        }

        if (!password || password === "") {

            user.firstName = firstName.toLowerCase();
            user.lastName = lastName.toLowerCase();
            user.email = email.toLowerCase();
            user.address = address;
            user.rolId = rolExist.id;

        } else {

            const hashedPassword = await bcrypt.hash(password, 12);
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.address = address;
            user.password = hashedPassword;
            user.rolId = rolExist.id;
        }

        await user.save();

        res.status(200).json({ user: user });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.userId == id) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        }

        const userExist = await User.findByPk(id);
        if (!userExist) {
            const error = new Error("User doesn't exist");
            error.statusCode = 404;
            throw error;
        }

        await userExist.destroy();

        res.status(200).json({ message: "User deleted succesfully" });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}