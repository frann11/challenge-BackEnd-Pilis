const jwt = require('jsonwebtoken')

exports.ordenar = function (parametro) {
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
}
exports.normalizarFechas = function (parametro){

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

    for (evento of parametro){
      for (fecha in evento['fechas']){
          let hora = evento['fechas'][fecha].fecha.toLocaleTimeString().slice(0,-3)
          evento['fechas'][fecha] =  evento['fechas'][fecha].fecha.toLocaleString('default', {  day: 'numeric', month: 'short'}).slice(0,-1) + ' @ '+hora
        }
   
      }
}

exports.obtenerFechas= function(arg){
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
