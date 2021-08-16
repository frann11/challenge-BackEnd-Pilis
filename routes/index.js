const express = require('express')
const router = express.Router();
const eventosController = require('../controllers/eventosController')

module.exports = () =>{
    router.get('/', eventosController.mostrarEventos)
    return router
}