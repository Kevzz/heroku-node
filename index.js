/**
 * Module dependencies.
 */
var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

var secret = 'this is the secret secret secret 12356';    

var portHeroku = process.env.PORT || 3000
var apiForwardingUrl = 'https://stage-formacret.herokuapp.com';

// Solution for forwarding from http to https taken from:
// https://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
var proxyOptions = {
    changeOrigin: true
};

httpProxy.prototype.onError = function (err) {
    console.log(err);
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log('Forwarding API requests to ' + apiForwardingUrl);

// Node express server setup.
var server = express();
server.set('port', 3000);

server.use(express.static(__dirname + '/app'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
//*********************ES PARA LA AUTENTIFICACION DEL LADO DEL SERVIDOR**************************************************
server.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

server.all('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  //console.log("contenido de req");
  //console.log(req);
  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.status(401).send('Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret);

  res.json({ token: token });
});

server.get('/api/restricted', function (req, res) {
    //console.log(req);
    //console.log("*********************************************************************************************++");
    //console.log(res);
  console.log('user ' + res.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});
//*************************AQUI TERMINA LA AUTENTIFICACION DEL LADO DEL SERVIDOR*****************************************


//*****************Esto es para obtener la informacion individual de las marcas ************************************
server.delete('/brands/:id', function(req, res) {
	var id= req.params.id;
	
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/brands/:id', function(req, res) {
	var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/brands/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.post('/brands', function(req, res) {
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
//******************************************************************+

//*****************Esto es para obtener la informacion individual de los clientes*******************************
server.delete('/clients/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/clients/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/clients/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/clients", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+
//*****************Esto es para obtener la informacion individual de los direcciones de envio*******************************
server.delete('/send_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/send_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/send_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/send_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+
//*****************Esto es para obtener la informacion individual de las productos*******************************
server.delete('/products/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/products/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/products/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/products", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+

//*****************Esto es para obtener la informacion individual de las proveedores*******************************
server.delete('/suppliers/:id', function(req, res) {
	var id= req.params.id;
	
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/suppliers/:id', function(req, res) {
	var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/suppliers/:id', function(req, res) {
	var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/suppliers", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+ locations

//*****************Esto es para obtener la informacion individual de las proveedores*******************************
server.delete('/locations/:id', function(req, res) {
	var id= req.params.id;
	
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/locations/:id', function(req, res) {
	var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/locations/:id', function(req, res) {
	var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/locations", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//****************************************************************** 

//*****************Esto es para obtener la informacion individual de las almacenes*******************************
server.delete('/warehouses/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/warehouses", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//****************************************************************** 

//*****************Esto es para obtener la informacion individual de las divisores*******************************
server.delete('/dividers/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/dividers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/dividers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/dividers", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//****************************************************************** 

//*****************Esto es para obtener la informacion individual de las divisas*******************************
server.delete('/currencies/:id', function(req, res) {
	var id= req.params.id;
	
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/currencies/:id', function(req, res) {
	var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/currencies/:id', function(req, res) {
	var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/currencies", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion individual de las proveedores*******************************
server.delete('/variants/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/variants", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion individual de las proveedores*******************************
server.delete('/prices/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/prices", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes x precios*******************************
server.delete('/taxes/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/taxes/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/taxes/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/taxes", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes x precios*******************************
server.delete('/variant_prices/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/variant_prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/variant_prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/variant_prices", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de ordenes de compra*******************************
server.delete('/purchase_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/purchase_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/purchase_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/purchase_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************
//*****************Esto es para obtener la informacion de la tabla de ordenes de venta*******************************
server.delete('/sell_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/sell_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//*****************Esto es para obtener la informacion de la tabla de variantes por orden*******************************
server.delete('/variant_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/variant_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/variant_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/variant_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//*****************Esto es para obtener la informacion de la tabla de variantes por orden de venta*******************************
server.delete('/variant_sell_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/variant_sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/variant_sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/variant_sell_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//************variant_orders******************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes por almacen*******************************
server.delete('/variant_warehouses/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/variant_warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/variant_warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/variant_warehouses", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//************variant_orders******************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes por divisor*******************************
server.delete('/variant_divisions/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.put('/variant_divisions/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.get('/variant_divisions/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "https://stage-formacret.herokuapp.com"});
});
server.all("/variant_divisions", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//************variant_orders******************************************************



// Start Server.
server.listen(portHeroku, function() {
    console.log('Express server listening on port ' +portHeroku);
});