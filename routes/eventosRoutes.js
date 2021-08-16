const express = require('express')
const router = express.Router();
const eventosController = require('../controllers/eventosController')
const { check, validationResult } = require('express-validator');

module.exports = () =>{
    router.post('/agregar-evento', 
    [        
        check("titulo", "titulo debe contener un valor").trim().not().isEmpty(),
        check("descripcion", "descripcion debe contener un valor").trim().not().isEmpty(),
        check("lugar", "lugar debe contener un valor").trim().not().isEmpty(),
        check("fechas", "fechas debe contener valore del estilo 'dd/mm/aa,hh:hh,precio'").matches(/(\d{2})(\/|-)(\d{2})(\/|-)(\d{2})(\,\d{2}\:\d{2}\,\d*)/),
        check("imagen", "imagen debe no estar vacia y ser una URL valida").not().isEmpty().isURL().matches(/(.*.jpg)|(.*.png)/)
    ],
    (req, res) => {
        try {
            validationResult(req).throw();
             eventosController.agregarEvento(req,res)
          } catch (err) {
            res.status(400).json(err);
          }
        }
)
                  
    router.get('/:id', 
    [        
        check("id", "id de evento invalido").isLength({min:24 , max:24}),
    ],
    (req, res) => {
        try {
            validationResult(req).throw();
            eventosController.mostrarEvento(req,res)
          } catch (err) {
            res.status(400).json(err);
          }
        }
)
    
    router.get('/user/:id', eventosController.mostrarEventosPropios)
    
return router
}