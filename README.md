# Kiosku Backend
This is the backend for the Kiosku Web App and Movil App, it was developed in Express JS.

## Tabla de contenidos

- [Recomendaciones](#recomendaciones)
- [Especificaciones](#especificaciones)
- [Dependencias](#dependencias)
- [Servicios](#servicios)
- [Instalaciones](#instalaciones)
- [Ambientes](#ambientes)
- [Consideraciones](#consideraciones)
- [Colecciones](#colecciones-en-la-base-de-datos)
- [ToDo](#todo)

## Recomendaciones

### - Versiones de Node y NPM

Se recomienda usar la version de Node 16.13 y npm 8.3, se puede descargar directamente de [Node](https://nodejs.org/es/) o utilizar [NVM](https://github.com/nvm-sh/nvm) que permite manejar distintas versiones de node en el mismo servidor.

### - Manejador de procesos para monitoreo de la API

Se recomienda usar PM2 como manejador de procesos de la API en produccion. Para mas informacion revisar la documentacion de [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/).

### - Sistema Operativo

Se recomienda desplegar el API en un servidor con un sistema operativo Linux,como [Ubuntu Server 22](https://ubuntu.com/download/server).

## Especificaciones

El app web crecos utiliza una API REST, desarrollado en Node 16. A continuacion se especifican las herramientas utilizadas.

## Base de datos



## Dependencias

A continuación, se muestra un listado de las librerías más importantes utilizadas en el API de Kiosku,
junto a su versión y una breve descripción. Para conocer más detalles de las librerías utilizadas, se
recomienda consultar el archivo `package.json` de la carpeta del código del API, y buscar las librerías
deseadas en sus respectivas páginas oficiales de documentación.

| Librería            | Versión     | Descripción                                                                                                                            |
| ------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| express             | 4.18.1      | Permite la creación de un servicio HTTP utilizando<br>Node.JS                                                                          |
| mongoose            | 6.3.6       | ORM que permite la interacción con una base de datos<br>de MongoDB                                                                     |
| jsonwebtoken        | 8.5.1       | Permite la generacion de un token para mantener un <br>registro de la autenticación del<br>usuario, de forma que pueda utilizar el API |
| multer              | 1.4.5-lts.1 | Permite recibir archivos en peticiones realizadas al API,<br>y guardarlos en un directorio dado                                        |
| dotenv              | 16.0.1      | Permite cargar las variables de entorno                                                                                                |
| bcryptjs            | 2.4.3       | Permite guardar contraseñas de usuarios encriptadas en<br>la base de datos                                                             |
| nodemailer          | 6.7.7       | Servicio de envío de correos                                                                                                           |
| nodemailer-sendgrid | 1.0.3       | Permite usar SendGrid como transporter para envio <br>de correos                                                                       |
| axios               | 0.27.2      | Permite hacer peticiones HTTP a la API de extraccion de<br>datos                                                                       |

## Servicios

### - Envío de correos electrónicos

Este servicio se da en la recuperación
de contraseñas para lo cual se notifica al usuario de estas acciones
por un correo electrónico. El envío de los correos electrónicos se generan por la librería
nodemailer.

El servicio se lo dejo configurado para usar [SendGrid](https://sendgrid.com/) como servicio de gestion de envio de correos, sin embargo se puede utilizar otro servicio y configurarlo con nodemailer, para mas informacion de como aplicarlo revisar la documentacion de [nodemailer](https://nodemailer.com/about/).

## Instalaciones

Para instalar las dependencias del proyecto se debe ejecutar el siguiente comando:

```bash
 npm install
```

Para instalar el process manager que permita el monitoreo de la API en produccion.

```bash
 npm install pm2@latest -g
```

## Ambientes

El API se ejecuta en los 2 ambientes utilizados hasta el momento, con los comandos npm y las variables de entorno respectivas
de acuerdo a lo descrito en la siguiente tabla:

| Ambiente   | Comandos          | Variables de entorno |
| ---------- | ----------------- | -------------------- |
| Desarrollo | npm run start:dev | .env.development     |
| Produccion | npm start         | .env.production      |

Sin embargo se pueden manejar estos ambientes con PM2 y apoyandose en el archivo de configuracion `ecosystem.config.js` que se encuentra en el nivel inicial del proyecto.

### - Variables de entorno

Las variables de entorno deben ir en un archivo tipo .env, como en el siguiente ejemplo:

```env
PORT=3001
DB_NAME=kiosku
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
SECRET=asjk71892
```
La variable `DB_NAME` es el nombre de la base de datos,la variable `DB_USER` es el nombre de usuario de la base de datos y `DB_PASSWORD` es la contraseña con la que inicia sesion dentro de MySQL el usuario, el `DB_HOST` es la ip del servidor de la base de datos,la variable `PORT` es el puerto en el que la API va a ser levantada, la variable `SECRET` es el secreto que va a utilizar el token de autenticacion.

Los archivos en los que iran las variables de entorno seran `.env.development` o `.env.production` dependiendo del ambiente de ejecucion, estos archivos deben estar en el mismo nivel del proyecto que el archivo `index.js`.

### - Desarrollo

Para utilizar el ambiente de desarrollo con PM2.

```bash
pm2 start ecosystem.config.js --env development
```

### - Produccion

Para utilizar el ambiente de produccion con PM2.

```bash
pm2 start ecosystem.config.js --env production
```

## Consideraciones

Para que la API pueda guardar las imagenes, debe crear una carpeta llamada `images` en el nivel principal. Para mas informacion, se deja la imagen de la estructura del proyecto.
