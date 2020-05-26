const bodyParser = require('body-parser');
const express = require('express');
/* instancia de express */
const app = express();
/* crear un servidor con express es mejor hacerlo con http en vez de uno de express */
const server = require('http').Server(app);
const io = require('socket.io')(server);

/* hay que pasarle un servidor, aunque por ahorrar linea se puede poner detras del require. */
/* io(server); */

/* importamos la carpeta app&router */
const Router = require('./app/router.js');

/* para enviar datos de un formulario. */
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended : true}));/* si no incluimos esta linea tenemos inconveniente al enviar formulario. */ 

app.use(express.static('public')); /* carpeta public */
/* Se entra cuando se ponga / por eso no se pone nada de STRING */
app.use('',Router);
/* motor de vistas */
app.set('view engine','pug'); /*  es muy sencillo y conocido */

/* una function para el listener para hacerlo mas limpio */
require('./app/socket')(io);



server.listen(3000,function(){
    console.log("Servidor corriendo en el puerto 3000");
})
