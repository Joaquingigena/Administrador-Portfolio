

var express= require("express");
var ProjectController= require("../Controllers/projects");

var router= express.Router();

// var multipart= require("connect-multiparty");

// var multipartMiddleare= multipart({uploadDir: "./uploads"});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, "user" + Date.now() + file.originalname);
    }
  });

  const upload = multer({ storage: storage });


router.get("/home",ProjectController.home);
router.post("/test",ProjectController.test);
router.post("/save-project",ProjectController.save);
router.get("/project/:id",ProjectController.getProject);
router.get("/proyectos",ProjectController.listarProyectos);
router.put("/modificar/:id",ProjectController.actualizarProyecto);
router.delete("/eliminar/:id",ProjectController.eliminarProyecto);
router.post("/cargarImagen/:id",upload.single('img'),ProjectController.cargarImagen);
router.get("/getImagen/:image",ProjectController.getImageFile);

module.exports= router;