'use strict'
const express = require('express');
const app = express();
//const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

// Cargo las variables de entorno
//dotenv.config({ path: `.env.${app.get('env')}` });

//Variables de entorno
const PORT = process.env.PORT || 3000;


//Configuracion de archivos e imagenes
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "product") {
            cb(null, 'images/product');
        } else if (file.fieldname === "profile") {
            cb(null, 'images/profile');
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${new Date().toISOString()}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


//Importando las rutas
const authRoutes = require('./routes/auth');
const rolRoutes = require('./routes/rol');
const membershipRoutes = require('./routes/membership');
const categoriesRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cityRoutes = require('./routes/city');
const provinceRoutes = require('./routes/province');
const userRoutes = require('./routes/user');
const warehouseRoutes = require('./routes/warehouse');
const stateRoutes = require('./routes/state');


app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).fields(
    [
        { name: 'profile', maxCount: 1 },
        { name: 'product', maxCount: 5 },
    ]
));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

//Rutas
app.use(authRoutes);
app.use(rolRoutes);
app.use(membershipRoutes);
app.use(categoriesRoutes);
app.use(productRoutes);
app.use(cityRoutes);
app.use(provinceRoutes);
app.use(userRoutes);
app.use(warehouseRoutes);
app.use(stateRoutes);

// Error Middleware
app.use((error, req, res, next) => {
    const errorStatus = error.statusCode || 500;
    const errorMessage = error.message;
    const errorData = error.data;
    res.status(errorStatus).json({ message: errorMessage, data: errorData });
});

const server = app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}.`);
});


module.exports = { app, server };