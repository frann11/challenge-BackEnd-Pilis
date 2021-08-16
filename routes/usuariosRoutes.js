const express = require('express')
const router = express.Router();
const usuariosController = require('../controllers/usuariosController')
const { check, oneOf, validationResult } = require('express-validator');
const { buildCheckFunction } = require('express-validator');
const { buildSanitizeFunction } = require('express-validator');
const sanitizeBodyAndQuery = buildSanitizeFunction(['body', 'query']);

module.exports = () =>{
    router.get('/', usuariosController.mostrarUsuarios )

    router.post('/login'
    ,[
        check("username", "username debe contener un valor").not().isEmpty().trim().escape(),
        check("password", "password debe contener un valor").not().isEmpty().escape(),
    ],
       (req, res) => {
        try {
            validationResult(req).throw()
            usuariosController.iniciarSesion(req,res)
          } catch (err) {
            res.status(400).json(err);
          }
        }) 

    router.post('/crear-usuario',[
        check("username", "username debe contener un valor").not().isEmpty().trim().escape(),
        check("password", "password debe contener un valor").not().isEmpty().escape()
    ],
       (req, res) => {
        try {
            validationResult(req).throw();
            usuariosController.crearCuenta(req,res)
          } catch (err) {
            res.status(400).json(err);
          }
        })
    
    return router
}