/* cuando esté el documento cargado del chat hará la función */
/* Al cliente */
$(document).ready(function(){
    /* inicializando poniendo el servidor que escucha */
    var socket = io('http://localhost:3000');
    username(socket);
    updateUsers(socket);
    newMessage(socket);
    updateMessage(socket);
});

function username(socket){
    /* emitir el evento username */
    socket.emit('username',{
        /*  se le pasa un json tiene que ser el nombre del usuario que se registra,  */
        username: localStorage.username
    });
}

function updateUsers(socket){
    socket.on('updateUsers', function(data){
        /* para que se limpien los usuarios cada vez que se conecten y que hay un render de conetado en verde */
        $('#users').html('');
        /* recorrer el array */
        for(var i = 0; i < data.users.length; i++){
            /* un html para poner a los usuarios con el radio en verde  */
            html = '';
            html += '<div class="user">';
            html += '<i class="fa fa-circle online-icon"></i> &nbsp;';
            html += data.users[i];
            html += '</div>';
            $('#users').append(html);
        }
    })
}

function newMessage(socket){
    /* para envio con enter */
    $('#message').keydown(function(ev){
        
        if(ev.keyCode == 13){
            ev.preventDefault();
            $('#send-msg-form').submit();
        }
    });
    /* para enviar mensaje */
    $('#send-msg-form').submit(function(ev){
        ev.preventDefault();
        socket.emit('newMessage',{
            username : localStorage.username,
            genero: localStorage.genero,
            message:$('#message').val()
        });
        /* limpia para que vuelvas a escribir otra vez */
        document.querySelector('#send-msg-form').reset();
    });
    
}

function updateMessage(socket){
    /* aqui solo escucha la actualizacion */
    socket.on('updateMessages', function(data){
        /* ahora hay que poner todo el html y
        comprobamos  si el mensaje es igual que el del localStorage
        para que se renderice de una forma u otra en plan royo facebook*/
        let html = '';
        if(data.username == localStorage.username){
            html+= '<div class="my-msg full-width flex">';
            if(data.genero == 'Male') html += '<div class="my-style-m message"><h4> Tú </h4>';
            else html += '<div class="my-style-f message"><h4> Tú </h4>';
                html += '<p class="lighter">' + data.message + '</p>';
                html += '</div></div>'; 
        }else{
            html += '<div class="full-width flex">';
            if(data.genero == 'Male')html += '<div class="blue message"><h4>' + data.username + '</h4>';
            else html += '<div class="pink message"><h4>' + data.username + '</h4>';
                html += '<p class="lighter">' + data.message + '</p>';
                html += '</div></div>';
        }
        $('#msg-list').append(html);
    });
}