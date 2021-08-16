const mongoose = require('mongoose')
const {Schema,model} = require('mongoose')
mongoose.Promise = global.Promise;

const usuariosSchema = new mongoose.Schema({
    username:{  
        type: String,
        trim: true,
        required : true
    },
 
    passwordHash:{ //pasword encriptado
        type: String,    
        trim: true,
        required : true
    },
    eventos:[{
        type: Schema.Types.ObjectId,
        ref:'Eventos'
    }]   
   
    
})

usuariosSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })

module.exports = mongoose.model('Usuarios', usuariosSchema)