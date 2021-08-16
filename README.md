# Challenge BackEnd PILIS
Challenge para la certificación BackEnd del programa PILIS Catamarca
Realizado con NodeJS y MongoDB

## Link a Heroku
Link a la API Rest en heroku : https://pacific-citadel-99354.herokuapp.com/

## Modulos utilizados
- express
- mongoose


## Requerimientos:
- Al entrar al sitio se debe ver un listado inicial de eventos ordenados por fecha
- Se debe poder obtener todos los detalles de un evento
- Se listaran eventos destacados en la pagina principal
- Login: Debo poder loguearme y entrar a una seccion del backend
- Listado de eventos del usuario
- Se debe poder crear eventos una vez logeado

### Usuario de prueba:
```
username: test
password: test
```

## Endpoints 

```
GET /
```
- Devuelve todos los eventos ordenados por fecha (sin distincion sobre su estado destacado) y lista aparte eventos destacados

```
GET /api/eventos/:id
```
-  Devuelve todos los datos del evento que contiene el id detallado

```
POST /api/usuarios/crear-usuario
```
- Registra un usuario en la API<br>
requiere los siguientes parametros:
```
{
 "username": USUARIO
 "password": PASSWORD
 }
```
```
POST /api/usuarios/login
```
- Logeo del usuario, devuelve un JSON Web Token (JWT) para autorizacion con duracion de 1hr<br>
Requiere los siguientes parametros en el body
```
{
 "username": USUARIO
 "password": PASSWORD
 }
```
```
POST /api/eventos/agregar-evento
```
- Agrega un nuevo evento<br>
Requiere header con bearer token obtenido al logearse 
```
Authorization: Bearer {TOKEN}
```

Requiere los siguientes parametros en el body <br>
Se puede agregar mas de un parametro 'fechas' representando el dia, hora y precio de esa fecha en particular
```
{ 
  "titulo": "Salida al aire libre"
  "descripcion": Paseo grupal
  "lugar": Avellaneda,Buenos Aires
  "fechas" (en formato *DD/MM/AA,HH:HH,PrecioDelDia* separados por coma) : 20/02/20,15:00;200
  *"fechas": segunda fecha,hora,precio,
  *"fechas": tercera fecha,hora precio.
  "imagen": 'URL A LA IMAGEN'
  }
```
```
GET /api/eventos/user/:id 
```
- Requiere header con token de autorizacion obtenido al logearse
- Devuelve todos los eventos posteados por el usuario cuando el id corresponda al del usuario logeado


