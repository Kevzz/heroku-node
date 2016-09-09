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

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/brands/:id', function(req, res) {
    var id= req.params.id;


    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/brands/:id', function(req, res) {

    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/brands", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+

//*****************Esto es para obtener la informacion individual de los usuarios ************************************
server.get('/users/:id', function(req, res) {

    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/users", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+

//*****************Esto es para obtener la informacion individual de las ordenes de ajuste ************************************
server.delete('/adjustment_orders/:id', function(req, res) {

    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/adjustment_orders/:id', function(req, res) {
    var id= req.params.id;


    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/adjustment_orders/:id', function(req, res) {

    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/adjustment_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+
//*****************Esto es para obtener la informacion individual de las variantes en los ajustes ************************************
server.delete('/variant_adjustments/:id', function(req, res) {

    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/variant_adjustments/:id', function(req, res) {
    var id= req.params.id;


    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/variant_adjustments/:id', function(req, res) {

    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/variant_adjustments", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+

//*****************Esto es para obtener la informacion individual de los clientes*******************************
server.delete('/clients/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/clients/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/clients/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/clients", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+
//*****************Esto es para obtener la informacion individual de los direcciones de envio*******************************
server.delete('/send_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/send_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/send_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/send_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+
//*****************Esto es para obtener la informacion individual de las productos*******************************
server.delete('/products/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/products/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/products/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/products", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/product/resume", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+

//*****************Esto es para obtener la informacion individual de las proveedores*******************************
server.delete('/suppliers/:id', function(req, res) {

    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/suppliers/:id', function(req, res) {
    var id= req.params.id;


    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/suppliers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/suppliers", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************+ locations

//*****************Esto es para obtener la informacion individual de las locaciones*******************************
server.delete('/locations/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/locations/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/locations/:id', function(req, res) {

    var id= req.params.id;
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/locations", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion individual de las almacenes*******************************
server.delete('/warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/warehouses", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion individual de las divisores*******************************
server.delete('/dividers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/dividers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/dividers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/dividers", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion individual de las divisas*******************************
server.delete('/currencies/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/currencies/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/currencies/:id', function(req, res) {
    var id= req.params.id;
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/currencies", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion individual de las variantes de los productos*******************************
server.delete('/variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/variants", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion individual de los precios*******************************
server.delete('/prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/prices", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de taxes*******************************
server.delete('/taxes/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/taxes/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/taxes/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/taxes", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes x precios*******************************
server.delete('/variant_prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/variant_prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/variant_prices/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/variant_prices", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de ordenes de compra*******************************
server.delete('/purchase_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/purchase_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/purchase_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/purchase_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//******************************************************************
//*****************Esto es para obtener la informacion de la tabla de ordenes de venta*******************************
server.delete('/sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/sell_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//*****************Esto es para obtener la informacion de la tabla de variantes por orden*******************************
server.delete('/variant_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/variant_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/variant_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/variant_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//*****************Esto es para obtener la informacion de la tabla de variantes por orden de venta*******************************
server.delete('/variant_sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/variant_sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/variant_sell_orders/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/variant_sell_orders", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//************variant_orders******************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes por almacen*******************************
server.delete('/variant_warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/variant_warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/variant_warehouses/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/variant_warehouses", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});
//************variant_orders******************************************************

//*****************Esto es para obtener la informacion de la tabla de variantes por divisor*******************************
server.delete('/variant_divisions/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/variant_divisions/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/variant_divisions/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/variant_divisions", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//************transfer_variants******************************************************

//*****************Esto es para obtener la informacion de la tabla de transfer_variants*******************************
server.delete('/transfer_variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.put('/transfer_variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.get('/transfer_variants/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: apiForwardingUrl});
});
server.all("/transfer_variants", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//************variants******************************************************

//*****************Esto es para obtener la informacion de la tabla de transferss*******************************
server.delete('/transfers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: transfer_variants});
});
server.put('/transfers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: transfer_variants});
});
server.get('/transfers/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: transfer_variants});
});
server.all("/transfers", function(req, res) {
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

//******************************************************************

//*****************Esto es para obtener la informacion de la tabla de rules*******************************
server.delete('/rules/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: transfer_variants});
});
server.put('/rules/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: transfer_variants});
});
server.get('/rules/:id', function(req, res) {
    var id= req.params.id;

    apiProxy.web(req, res, {target: transfer_variants});
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
