const express = require('express')
const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
require('./config/db')

const routes = require('./routes')
const usuarioRoutes = require('./routes/usuariosRoutes')
const eventosRoutes = require('./routes/eventosRoutes')


require('dotenv').config({path: 'variables.env'})

const app = express()

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/',routes())
app.use('/api/usuarios',usuarioRoutes())
app.use('/api/eventos',eventosRoutes())

const host = '0.0.0.0'
const port = process.env.PORT


const server = app.listen(5000, () => {
    console.log(`el servidor esta funcionando`)
  })

  module.exports = {app, server}