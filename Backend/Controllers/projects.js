

const project = require("../Models/project");
var projects= require("../Models/project");
var fs= require("fs");
var path= require("path"); 

var controller= {

    home: function(req,res){
        return res.status(200).send({
            message: "Soy la home"
        });
    },

    test: function(req,res){
        return res.status(200).send({
            message: "Soy el test"
        });
    },

    save: function(req,res){
        var project= new projects();

        var params= req.body;

        project.nombre= params.nombre;
        project.descripcion= params.descripcion;
        project.categoria= params.categoria;
        project.año= params.año;
        project.lenguaje= params.lenguaje;
        project.img= null;

        //Metodo de mongoose para guardar
        project.save().then((projectStored) => {
            if (!projectStored) {
                return res.status(404).send({ message: "No se pudo guardar el proyecto" });
            }
            return res.status(200).send({ project: projectStored });
        })
        .catch((err) => {
            console.log("Error al guardar el proyecto:", err);
            return res.status(500).send({ message: "Hubo un error al guardar" });
        });
        // .then((projectStored)=>{
        //     return res.status(200).send({project: projectStored})
        // })
        // .catch((err)=>{

        //     if(!projectStored) return res.status(404).send({message:"No se pudo guyardar el proyecto"});
        //     if(err) return res.status(500).send({message: "hubo un error al guardar"});
        // }
        // );

        // project.save((err,projectStore)=>{
        //     if(err) return res.status(500).send({message: "hubo un error al guardar"});

        //     if(!projectStore) return res.status(404).send({message:"No se pudo guyardar el proyecto"});

        //     return res.status(200).send({project: projectStore});

        // })

    },
    getProject: function(req,res){
        
        var idProject= req.params.id;
        var Project= new projects();

        project.findById(idProject).then((project)=>{
            if (!project) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se han encontrado el projecto"
                });
            }
            // Devolver resultado
            return res.status(200).json({
                status: "success",
                project: project
            });
        }).catch((error) => {
            return res.status(404).json({
                status: "error",
                mensaje: "Ha ocurrido un error",
                error
            });
        })
    },
    listarProyectos: function(req,res){

        // project.find({}).exec((errr,proyectos)=>{
        //     if(err) return res.status(500).send({message: "error al devolcer"});

        //     if(!proyectos) return res.status(404).send({message: "no se encontraron"});

        //     return res.status(200).send({proyectos});
        // });

        project.find({}).sort().then((projects)=>{
            
 
            if(!projects) return res.status(404).send({message: "No hay projectos que mostrar..."});
 
            return res.status(200).send({message: "Proyectos ",
                                         projects});
        }).catch((err)=>{
            if(err) return res.status(500).send({message: "Error al devolver los datos"});
        })

    },
    actualizarProyecto:function(req,res){

        var id= req.params.id;
        var modificado= req.body;

        project.findByIdAndUpdate(id, modificado)
        .then((projectUpdated)=>{
            return res.status(200).send({
                project: projectUpdated
            })
        })
        .catch(() => {
            return res.status(404).send({message: "Proyecto no encontrado para actualizar."});
        })
    },
    eliminarProyecto: function(req,res){

        var id= req.params.id;

        project.findOneAndDelete(id)
                .then((proyectoEliminado)=>{
                    return res.status(200).send({
                        project: proyectoEliminado
                    }) 
                })
                .catch(() => {
                    return res.status(404).send({message: "Proyecto no encontrado para eliminar."});
                })

    },
    cargarImagen: function(req,res){

        var idProyecto= req.params.id;
        var fileImagen= "No se tiene nada";

        if(req.file){

            var filePath= req.file.path;
            var fileSplit= filePath.split("\\");
            var fileImagen= fileSplit[1];

            //Problema con path
            //Falta desarrollar la carga
            project.findByIdAndUpdate(idProyecto,{img: fileImagen})
            .then((projectUpdated)=>{
                return res.status(200).send({
                    project: projectUpdated
                })
            })
            .catch(() => {
                return res.status(404).send({message: "Proyecto no encontrado para actualizar."});
            })

            
            return res.status(200).send({files: fileImagen})
        }
        else{
            return res.status(200).send({message: fileImagen})
        }
    },
    
    getImageFile: function (req, res) {
        var file = req.params.image;
        var pathFile = './uploads/' + file;
 
        fs.stat(pathFile, (err, exists) => {
            if (exists) {
               return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen'
                });
            }
        });
 
    }

}

module.exports=controller; 