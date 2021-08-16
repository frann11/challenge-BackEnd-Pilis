const mongoose = require('mongoose')
const {Schema,model} = require('mongoose')
mongoose.Promise = global.Promise;



const eventosSchema = new mongoose.Schema({
    titulo:{
        type: String,
        trim: true,
        required : true
    },
    descripcion:{
        type: String,
        trim: true,
        required : true
    },
    fechaHoraPrecio:{
        
        type: [{
            fecha: Date,
            precio: Number
        }],
        trim: true,
        _id: false

    },
    lugar:{
        type: String,
        trim: true,
        required : true
    },
    destacado:{
        type: Boolean,      
    },
    imagen:{
        type: String,      
       // required:true,
        trim:true,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuarios'
    }
   
})

eventosSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.fechaHoraPrecio._id
    }
  })

module.exports = mongoose.model('Eventos', eventosSchema)