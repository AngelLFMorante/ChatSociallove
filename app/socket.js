/* un array para meter a todos los usuarios */
/* Servidor */
var users = require('./users');


module.exports = function(io){
/* evento, "on" -> es como un listener */
io.on('connection', function(socket){
    /* cada vez que se conecte alguien */
    console.log("Nuevo Usuario Conectado");
    /* emitiendo socket uno por cada cliente */
    addUser(socket);
    /* disconect */
    disconnectUser(socket);
    newMessage(socket);
});
}

function addUser(socket){
    /* escuchando un evento */
    socket.on('username', function(data){
        console.log('Usuario: '+data.username);
        /* un objeto json */
        socket.username = data.username;
        users.push(data.username);
        /* tenemos que actualizar a los usuarios */
        updateUsers(socket);
    });
}

function updateUsers(socket){
    /*  se pone la llave porque seria user:user */
    socket.emit('updateUsers', {users});
    /* para que llegue a todos los usuarios */
    socket.broadcast.emit('updateUsers', {users});
}

function  disconnectUser(socket){
    socket.on('disconnect',function(){
        /* para que no se repitan los nombres, al actualizar */
        if(socket.username){
            /* quita el primer indice */
            users.splice(users.indexOf(socket.username),1);
        }
        /* se actualice en forma real, manda la lista del usuario. */
        updateUsers(socket);
    });
}

function newMessage(socket){
    socket.on('newMessage',function(data){
        /* console.log(data); e sto es por si quieres verlo por el servidor*/
        socket.emit('updateMessages', data);
        /* es importante poner esta para que salga para todos los usuarios */
        socket.broadcast.emit('updateMessages', data);
    });
}