var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const products=[
    {name: "Microondas", price: 45, stock: 6},
    {name: "Frigorifico", price: 200, stock:4},
    {name: "Lampara", price: 20, stock:10},
    {name: "TV", price: 90, stock:0},
    {name: "Lavadora", price: 290, stock:3},
    {name: "Secadora", price: 180, stock:5}
  ];
  res.render('index', { title: 'Mike Express', products });
});

module.exports = router;
