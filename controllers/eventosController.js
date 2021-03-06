const mongoose = require('mongoose')
const Eventos = mongoose.model('Eventos')
const Usuarios = mongoose.model('Usuarios')
const jwt = require('jsonwebtoken')
const helpers =  require('../helpers/helpers')

exports.mostrarEventos = async(req,res,next) => {
  try{
    var eventos = await Eventos.find({},{'descripcion':0,'user':0,'destacado':0,'__v':0}).sort({'fechas.fecha' : 1}).lean()
    var destacados = await Eventos.find({'destacado': true },{'destacado':0,'user':0})
 
    if (!eventos.length){
      throw Error ( 'No hay eventos disponibles') 
    } else {
      
       var eventosMostrar = eventos
 
       for (evento of eventosMostrar){
         (evento['fechas'] = helpers.arreglarFechas(evento['fechas']))
         }    
     }
     if (!destacados.length){
      destacadosMostrar = 'no hay eventos destacados'
     } else {
      var destacadosMostrar = destacados
      for (evento of destacadosMostrar){
          evento['fechas']=helpers.normalizarFechas(evento['fechas'] )
         }

    }

    res.json({'eventos':[eventos],'destacados':[destacadosMostrar]})
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
      var eventoMostrar = evento.toJSON()
      eventoMostrar['fechas']=helpers.normalizarFechas(eventoMostrar['fechas'] )
      
      res.json(eventoMostrar)
    } catch (error){ 
      res.status(400).json({'errors':[{'msg':error.message}]});
    } 
  }

  exports.agregarEvento = async(req,res,next) => {
    try{
    const authorization = req.get ('authorization')
    let token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET)
    if (!token || !decodedToken.id){
      throw Error ( 'token de autorizacion invalido') 
    }
    const userId = decodedToken.id
    var {titulo,descripcion,lugar,destacado=false,imagen,fechas } = req.body
    const user = await Usuarios.findById(userId)

  fechas=helpers.obtenerFechas(fechas)
  fechas = helpers.ordenar(fechas)
  

    valores = {
      titulo,
      descripcion,
      lugar,
      destacado,
      fechas,
      user : userId,
      imagen
    }

    const evento = new Eventos(valores)

    
        const savedEvento = await evento.save()
        user.eventos = user.eventos.concat(savedEvento._id)
        await user.save()
        var mostrar = savedEvento.toJSON()
        mostrar['fechas']=helpers.normalizarFechas(mostrar['fechas'] )
        res.json(mostrar)

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
  const eventos = await Eventos.find({user:userId},{user:0}).sort({'fechas.fecha':1})


  res.json(eventos)

     }