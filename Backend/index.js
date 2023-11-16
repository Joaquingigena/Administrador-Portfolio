'use strict'

const { error } = require("console");
var mongoose= require("mongoose");

var app= require("./app");
var port= "3700";

// mongoose.set('useFindAndModify', false);
mongoose.Promise= global.Promise;

mongoose.connect('mongodb://localhost:27017/Portfolio',{  useNewUrlParser:true, useUnifiedTopology: true,family:4 })
        .then(()=>{
            console.log("Conexion establecida correctamente ");
            
            //Crearcion del servidor
            app.listen(port,()=>{
                console.log("Servidor corriendo en la url localhost 3700");
            })
       
        }
        )
        .catch(error=>{
            console.log("Hubo un error");
            console.log(error);
        })