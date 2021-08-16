const jwt = require('jsonwebtoken')

exports.ordenar = function (parametro) {
  console.log(parametro)
  parametro.sort(function(a, b) {
    if (Array.isArray(a) && Array.isArray(b)){        
      var keyA = (a.fechas[0].fecha.getTime())
      var keyB =  (b.fechas[0].fecha.getTime())
    } else {
      var keyA = new Date(a.fecha)
     var keyB = new Date(b.fecha)
    }


    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0;
  }) 
  return parametro
}
exports.normalizarFechas = function (parametro){
  console.log(parametro,'parametro')
  exports.ordenar(parametro)
    parametro.sort(function(a, b) {
      if (Array.isArray(a) && Array.isArray(b)){        
        var keyA = (a.fechas[0].fecha.getTime())
        var  keyB =  (b.fechas[0].fecha.getTime())
      } else {
        var keyA = new Date(a.fecha)
        var keyB = new Date(b.fecha)
      }

      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0;
    }) 
    var cambiar = []

    for (evento in parametro){
      console.log(parametro[evento])
      let hora = (parametro[evento].fecha.toLocaleTimeString().slice(0,-3))
      cambiar.push({'fecha':parametro[evento].fecha.toLocaleString('default', {  day: 'numeric', month: 'short'}) + ' '+hora , 'precio':parametro[evento].precio})
      }
      console.log(cambiar)
    return cambiar
}

exports.obtenerFechas= function(arg){
  console.log(arg)
  var fechas = []
  for (x of arg){
    let j = x.split(',')
    let hora = j[1]
    let fechaq = j[0]
    let pattern = /(\d{2})(\/|-)(\d{2})(\/|-)(\d{2})/
    let dt = new Date('20'+fechaq.replace(pattern,'$5-$3-$1')+'T'+hora+':00')
    let precio =  j[2]
    fechas.push({'fecha' : dt, 'precio' : parseInt(precio)})
}
  return fechas
}
