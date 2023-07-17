const express = require('express');
const router  = express.Router();
const altacontrolador = require('../controllers/altacontrolador');
const sorteocontrolador = require ('../controllers/sorteocontrolador');
const maduracioncontrolador = require ('../controllers/maduracioncontrolador');
const login = require ('../controllers/login');

router.route('/')
  .get(login.list)
  .post(login.login);

router.get('/inicio', altacontrolador.list);
router.post('/buscar', altacontrolador.search);
router.post('/inicio/add', altacontrolador.save );
router.post('/inicio/updates/:id', altacontrolador.update);
router.get('/inicio/updates/:id', altacontrolador.edit);
router.get('/inicio/deletes/:id', altacontrolador.delete);
//router.post('/buscar', altacontrolador.busquedaregis);
//post get para sorteo
router.get('/sorteo', sorteocontrolador.lists);
//router.post('/buscar', sorteocontrolador.search);
router.post('/sorteo/adds', sorteocontrolador.saves);
router.get('/sorteo/update/:id', sorteocontrolador.edits);
// Ruta para guardar los cambios después de la edición
router.post('/sorteo/update/:id', sorteocontrolador.updates);
// Ruta para eliminar un registro
router.get('/sorteo/delete/:id', sorteocontrolador.deletes);


//post get para maduracion
router.get('/maduracion', maduracioncontrolador.lista);
//router.post('/addm', altacontrolador.saves );
//router.post('/update/:id', altacontrolador.updates);
//router.get('/update/:id', altacontrolador.edits);
//router.get('/delete/:id', altacontrolador.deletes);

module.exports = router;