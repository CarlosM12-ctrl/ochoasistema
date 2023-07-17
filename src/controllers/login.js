const controller = {};



controller.list = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM login ', (err, login) =>{
            if(err){
                res.json(err);
            }
            console.log(login);
            res.render('login',{
                data: login
            })//enlistar datos
        });
    });
}

controller.login = (req, res) => {
    const { user, psw } = req.body;
    req.getConnection((err, conn) => {
      if (err) {
        console.error('Error de conexión a la base de datos:', err);
        res.render('/', { error: 'Error de conexión a la base de datos' });
      } else {
        conn.query(
          'SELECT * FROM login WHERE user = ? AND psw = ?',
          [user, psw],
          (err, results) => {
            if (err) {
              console.error('Error al consultar la base de datos:', err);
              res.render('/', { error: 'Error al iniciar sesión' });
            } else {
              if (results.length > 0) {
                // Las credenciales son correctas, redirige al usuario a la página principal o a otra página de tu elección
                res.redirect('/inicio');
              } else {
                // Las credenciales son incorrectas, muestra un mensaje de error en la vista
                res.render('/', { error: 'Credenciales incorrectas' });
              }
            }
          }
        );
      }
    });
  };

module.exports = controller;