// usuario ???
//email
//contraseña
//eventos
const mongoose = require('mongoose')
const Usuarios = mongoose.model('Usuarios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.iniciarSesion = async(req,res) => {
    const {username,password} = req.body
    const user = await Usuarios.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password,user.passwordHash)
    
    if(! (user && passwordCorrect)){
        res.status(400).json({'errors':[{'msg':'user o password invalido'}]});
    }
    
    const userForToken = {
        id : user._id,
        username : user.username
    }

    const token = jwt.sign(userForToken, process.env.TOKENSECRET, { expiresIn: '1h' })

    {res.send({
        username: user.username,
        token
    })}
} 


exports.crearCuenta = async(req,res,next) => {

 try   
 {   const { username, password} = req.body
    const user = await Usuarios.find({username:username})

    if (user.length) {
      throw Error ( 'usuario en uso, por favor elija otro') 
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const usuario = new Usuarios({
        username,
        passwordHash
    })

    const savedUser = await usuario.save()

    res.json(savedUser)} catch(error){
        res.status(400).json({'errors':[{'msg':error.message}]});
    }
}

