/**
 * Module dependencies.
 */
var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');

var jwt = require('jwt-simple');


var apiForwardingUrl = 'http://stage-formacret.herokuapp.com';
var portHeroku = process.env.PORT || 3000;

// Solution for forwarding from http to https taken from:
// http://stackoverflow.com/questions/15801014/how-to-use-node-http-proxy-for-http-to-https-routing
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


server.set('jwtTokenSecret', 'YOUR_SECRET_STRING');

server.set('port', 3000);
server.use(express.static(__dirname + '/app'));

//*****************Esto es para obtener la informacion individual de las marcas ************************************
server.delete('/brands/:id', function(req, res) {

    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/brands/:id', function(req, res) {
    var id= req.params.id;


    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/brands/:id', function(req, res) {

    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/brands", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+

//*****************Esto es para obtener la informacion individual de los clientes*******************************
server.delete('/clients/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/clients/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/clients/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/clients", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+
//*****************Esto es para obtener la informacion individual de los direcciones de envio*******************************
server.delete('/send_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/send_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/send_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/send_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+
//*****************Esto es para obtener la informacion individual de las productos*******************************
server.delete('/products/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/products/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/products/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/products", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+

//*****************Esto es para obtener la informacion individual de las proveedores*******************************
server.delete('/suppliers/:id', function(req, res) {

    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/suppliers/:id', function(req, res) {
    var id= req.params.id;


    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/suppliers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/suppliers", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+ locations

//*****************Esto es para obtener la informacion individual de las proveedores*******************************
server.delete('/locations/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/locations/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/locations/:id', function(req, res) {

    var id= req.params.id;
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/locations", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//****************************************************************** 

//*****************Esto es para obtener la informacion individual de las almacenes*******************************
server.delete('/warehouses/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/warehouses", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//****************************************************************** 

//*****************Esto es para obtener la informacion individual de las divisores*******************************
server.delete('/dividers/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/dividers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/dividers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/dividers", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//****************************************************************** 

//*****************Esto es para obtener la informacion individual de las divisas*******************************
server.delete('/currencies/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/currencies/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/currencies/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/currencies", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion individual de las proveedores*******************************
server.delete('/variants/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/variants", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion individual de las proveedores*******************************
server.delete('/prices/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/prices", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes x precios*******************************
server.delete('/taxes/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/taxes/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/taxes/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/taxes", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes x precios*******************************
server.delete('/variant_prices/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/variant_prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/variant_prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/variant_prices", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de ordenes de compra*******************************
server.delete('/purchase_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/purchase_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/purchase_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/purchase_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************
//*****************Esto es para obtener la informacion de la tabla de ordenes de venta*******************************
server.delete('/sell_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/sell_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//*****************Esto es para obtener la informacion de la tabla de variantes por orden*******************************
server.delete('/variant_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/variant_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/variant_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/variant_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//*****************Esto es para obtener la informacion de la tabla de variantes por orden de venta*******************************
server.delete('/variant_sell_orders/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/variant_sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/variant_sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/variant_sell_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//************variant_orders******************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes por almacen*******************************
server.delete('/variant_warehouses/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/variant_warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/variant_warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/variant_warehouses", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//************variant_orders******************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes por divisor*******************************
server.delete('/variant_divisions/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/variant_divisions/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/variant_divisions/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/variant_divisions", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//************transfer_variants******************************************************

//*****************Esto es para obtener la informacion de la tabla de transfer_variants*******************************
server.delete('/transfer_variants/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/transfer_variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/transfer_variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/transfer_variants", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//************variants******************************************************

//*****************Esto es para obtener la informacion de la tabla de transferss*******************************
server.delete('/transfers/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/transfers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/transfers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/transfers", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de rules*******************************
server.delete('/rules/:id', function(req, res) {
    var id= req.params.id;
    
    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.put('/rules/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.get('/rules/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: "http://stage-formacret.herokuapp.com"});
});
server.all("/rules", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//******************************************************************

//*****************Esto es para obtener solo la informacionde cuales son transferencias *******************************
server.all("/transferences", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//************variants******************************************************

//*****************Esto es para obtener solo la informacionde cuales son transferencias *******************************
server.all("/loans", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//************variants******************************************************

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

// Start Server.
server.listen(portHeroku, function() {

    console.log('Express server listening on port ' + portHeroku);
});