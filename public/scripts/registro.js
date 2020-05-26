/* recogemos los datos del usuario y el tipo */
window.onload = function (){
    document.querySelector('#send-form');
    document.addEventListener('click',function(ev){
            localStorage.username = document.querySelector('#username').value
            localStorage.genero = document.querySelector('input[name=sex]:checked').value
        });
}