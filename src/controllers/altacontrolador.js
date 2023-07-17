const controller = {};

controller.search = (req, res) => {
    const { busqueda } = req.body;
    req.getConnection((err, conn) => {
      if (err) {
        console.error('Error de conexión a la base de datos:', err);
        res.render('inicio', { error: 'Error de conexión a la base de datos' });
      } else {
        conn.query(
          'SELECT * FROM registro WHERE placas LIKE ?',
          [`%${busqueda}%`],
          (err, results) => {
            if (err) {
              console.error('Error al consultar la base de datos:', err);
              res.render('inicio', { error: 'Error al realizar la búsqueda' });
            } else {
              res.render('inicio', { data: results });
            }
          }
        );
      }
    });
  };
controller.search = (req, res) => {
    const { busqueda } = req.body;
    req.getConnection((err, conn) => {
      if (err) {
        console.error('Error de conexión a la base de datos:', err);
        res.render('inicio', { error: 'Error de conexión a la base de datos' });
      } else {
        conn.query(
          'SELECT * FROM registro WHERE productor LIKE ?',
          [`%${busqueda}%`],
          (err, results) => {
            if (err) {
              console.error('Error al consultar la base de datos:', err);
              res.render('inicio', { error: 'Error al realizar la búsqueda' });
            } else {
              res.render('inicio', { data: results });
            }
          }
        );
      }
    });
  };
controller.list = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM registro ', (err, inicio) =>{
            if(err){
                res.json(err);
            }
            console.log(inicio);
            res.render('inicio',{
                data: inicio
            })//enlistar datos
        });
    });
};
controller.save = (req, res)=>{
    const data= req.body;
    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO registro set ?', [data]);
            res.redirect("/inicio");
        });//agregar datos
};
controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            console.error("Error de conexión a la base de datos:", err);
            return res.status(500).send("Error de conexión a la base de datos");
        }

        if (!id) {
            console.error("ID inválido");
            return res.status(400).send("ID inválido");
        }

        conn.query('DELETE FROM registro WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.error("Error al ejecutar la consulta:", err);
                return res.status(500).send("Error al ejecutar la consulta");
            }
            res.redirect('/inicio');
        });
    });
};



controller.edit = (req, res) =>{
    const { id } = req.params;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM registro WHERE id = ?',[id], (err, data)=>{
            console.log(data);
            res.render('inicioedit', {
                data:data[0]
            })
      });
    })
};

controller.update = (req, res) =>{
    const { id } = req.params;
    const nregis = req.body;
    req.getConnection((err, conn)=>{
        conn.query('UPDATE registro set ? WHERE id = ?', [nregis, id], (err, rows)=>{
            res.redirect('/inicio');
        });
    })
};




module.exports = controller;