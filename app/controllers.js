const users = require('./users');
/* se ejecuta cuando entra en el get "/" se necesita req y res*/
function index(req, res){
    /* nombre de la vista que estará en carpeta VIEW */
    res.render('index',{validated:true});

}
/* se haga una peticion post en "/chat"  request y response*/
function redirect(req, res){
    if(req.validate) return res.render('chat');
    return res.render('index',{validated : false});
}

/* para que no se repitan usuarios, next es lo que sigue en router. */
function validate(req, res, next){
    req.validate = false;
    /* para que llegue el usuario desde body */
    if(users.indexOf(req.body.username) == -1) req.validate = true;
    next();
}


module.exports = {
    index,
    validate,
    redirect
}