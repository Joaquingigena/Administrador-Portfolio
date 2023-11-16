
var mongoose= require("mongoose");
var Schema= mongoose.Schema;

var ProjectSchema=Schema({
    nombre: String,
    descripcion: String,
    categoria: String,
    año: Number,
    lenguaje: String,
    img:String
});

module.exports= mongoose.model("project",ProjectSchema);