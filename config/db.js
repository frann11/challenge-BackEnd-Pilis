const mongoose= require('mongoose')
require('dotenv').config({path:'variables.env'});

const {DATABASE, DATABASE_TEST, NODE_ENV} = process.env

const connectionString = NODE_ENV === 'test'
? DATABASE_TEST 
: DATABASE

mongoose.connect(connectionString, {useNewUrlParser:true})

mongoose.connection.on('error',(error) => {
    console.log(error)
})

//importar los modelos
require('../models/Eventos')
require('../models/Usuarios')