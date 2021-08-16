const mongoose = require('mongoose')
const Eventos = mongoose.model('Eventos')
const Usuarios = mongoose.model('Usuarios')
const jwt = require('jsonwebtoken')
const helpers =  require('../helpers/helpers')

exports.mostrarEventos = async(req,res,next) => {
  try{
    var eventos = await Eventos.find({},{'descripcion':0,'user':0,'destacado':0,'fechaHoraPrecio.precio':0})
    var destacados = await Eventos.find({'destacado': true },{'destacado':0,'fechaHoraPrecio.precio':0,'user':0})
    
    if (!eventos.length){
      throw Error ( 'No hay eventos disponibles') 
    } else {
      helpers.normalizarFechas(eventos)
    }
     if (!destacados.length){
       destacados = 'no hay eventos destacados'
     } else {
      helpers.normalizarFechas(destacados)
    }

    res.json({'eventos':[eventos],'destacados':[destacados]})
  } catch(error){
    res.status(400).json({'errors':[{'msg':error.message}]});
  } 
    }
    

exports.mostrarEvento = async(req,res,next) => {
    const eventoId = req.params.id
    try {
    const evento = await Eventos.findById(eventoId)
      if (!evento ){
        throw Error ( 'evento invalido') 
      }
      res.json(evento)
    } catch (error){ 
      res.status(400).json({'errors':[{'msg':error.message}]});
    } 
  }

  exports.agregarEvento = async(req,res,next) => {
    const authorization = req.get ('authorization')
    let token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET)
    if (!token || !decodedToken.id){
      res.status(400).json({'errors':[{'msg':'token de autorizacion invalido'}]});
    }
    const userId = decodedToken.id
    const {titulo,descripcion,lugar,destacado=false,fechaHoraPrecio,imagen } = req.body
    const user = await Usuarios.findById(userId)

   
   var fechas = helpers.obtenerFechas(fechaHoraPrecio)

   helpers.ordenar(fechas)

    valores = {
      titulo,
      descripcion,
      lugar,
      destacado,
      fechaHoraPrecio:fechas,
      user : userId,
      imagen
    }

    const evento = new Eventos(valores)

    try{
        const savedEvento = await evento.save()
        user.eventos = user.eventos.concat(savedEvento._id)
        await user.save()

        res.json(savedEvento)

    } catch (error){
      res.status(400).json({'errors':[{'msg':error.message}]});
    }

}

 exports.mostrarEventosPropios = async(req,res,next) => {

  const authorization = req.get ('authorization')
  let token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer')){
      token = authorization.substring(7)
  }
  
  
  const decodedToken = jwt.verify(token, process.env.TOKENSECRET)

  if (!token || !decodedToken.id || req.params.id != decodedToken.id){
    res.status(401).json({'errors':[{'msg':'Autorizacion Invalida'}]});
  }

  const userId = decodedToken.id
  const eventos = await Eventos.find({user:userId},{user:0})


  res.json(eventos)

     }