/* definir express el importe de la dependencia */
const express = require('express');
const controllers = require('./controllers');
const Router = express.Router();

/* para manejar las rutas, de momento lo dejo así para ver si podemos hacer que funcione*/
Router.get('/',controllers.index);
Router.post('/chat',controllers.validate,controllers.redirect);

module.exports = Router;