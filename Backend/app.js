'use strict'

//Cargo express
var express= require('express')
//Cargo bodyparser (Me facilita para converir a json los parametros que llegan)
var bodyParser= require("body-parser")

var app= express();

//Cargar archivos de rutas
var proyect_routes= require("./Routes/project");

//Middlewares
app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());

//Cors
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Rutas
app.use("/api",proyect_routes);

//Aca exporto este modulo para utilizarlo en otros archivos

module.exports= app;