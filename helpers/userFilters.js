'use strict'
const { Op } = require('sequelize');
const { User } = require('../models');
const { Rol } = require('../models');

const userFilters = async (email, nombres, apellidos) => {
    
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

    return users;

}

module.exports = { userFilters }