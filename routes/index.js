var express = require('express');
var router = express.Router();
var products=require('../models/products.js');
var user=require('../models/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  const username=req.session.username;
  res.render('index', { title: 'Mike Express', username, products });
});

router.get('/products/:ref', function(req, res, next) {
  var ref=req.params.ref;
  const product=products.find(function(p) {
    return p.ref==ref;
  });
  
  if (product) {
    res.render('product', { product });
  }else {
    res.redirect("/error");
  }

});

var cesta= [];

router.post("/comprar", function (req, res, next){
  const ref=req.body.ref;

  const product=products.find(function(p) {
    return p.ref==ref;
  });

  cesta.push(product);

  res.redirect("/");
});

router.get("/login", function (req, res, next){
  res.render('login');
});

/*Procesa el formulario del ogin. Recibe los datos del formulario en la peticion (req) y comprueba si existe
algun usuario con ese nombre y contraseña. De ser asi, crea una cookie y lo manda a la pagina principal.
De no coincidir, carga de nuevo la pagina del login y muestra un error,*/
router.post("/login",function (req, res, next) {
  const username=req.body.username;
  const password=req.body.password;
  const users=user.find(function (u) {
    return (u.username==username && u.password==password);
  });

  if (users){
    req.session.username = username;
    res.redirect("/");
  }else {
    res.render("login");
  }

});

module.exports = router;
