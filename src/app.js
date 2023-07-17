const express = require('express');
const path = require ('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection =require('express-myconnection' );
const app = express();

//importar rutas
const alta = require('./routes/alta');
//configuraciones
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') )

//middleware
app.use(morgan('dev')); 
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'ochoasistema'
}, 'single'))
app.use(express.urlencoded({extends: false}));
//routes/rutas

app.use('/', alta);
app.use('/inicio', alta);
app.use('/sorteo', alta); 
app.use('/maduracion', alta);
//app.use('/maduración', alta);
//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('inicio', { cssPath: '/styles.css' });
});
app.get('/sorteo', (req, res)=>{
    res.render('sorteo', { cssPath: '/style.css'});
})
//inicio server
app.listen(app.get('port'), () =>{
    console.log('Server en puerto 3000');
});