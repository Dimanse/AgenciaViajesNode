// sintaxis CommonJs
//const express = require('express');

// sintaxis module
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'

const app = express();

// conectar a la base de datos
db.authenticate()
    .then(() => console.log('Se concecto a la base de datos correctamente'))
    .then( error => console.log(error))

//imprime en pantalla el string hola mundo
// app.get('/', (req, res) => {
//     res.send('Hola mundo');
// });

//imprime en la pantalla un .json
// app.get('/', (req, res) => { // req: (request) lo que enviamos res: (respond) lo que express responde
//     res.json({
//         id: 1,
//         nombre: 'Jose Pablo',
//         edad: 32
//     })
// })




// Definir el puerto
// process.env.PORT sera el puerto que creara la pagina donde hagamos el deployment mientras tanto usar el puerto 4000

const port = process.env.PORT || 4000;

// habilitar pug
app.set('view engine', 'pug');

// definir la carpeta public
app.use(express.static('public'));

app.use('/viajes', express.static('public'));

// agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true }));

// obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.paginaInicio = 'Agencia de viajes';
    next();
})

app.use('/', router);


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});