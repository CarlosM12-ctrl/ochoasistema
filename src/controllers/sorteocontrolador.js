const controller = {};

//controller.search = (req, res) => {
//    const { busqueda } = req.body;
//    req.getConnection((err, conn) => {
//      if (err) {
//        console.error('Error de conexión a la base de datos:', err);
//        res.render('inicio', { error: 'Error de conexión a la base de datos' });
//      } else {
//        conn.query(
//          'SELECT * FROM registro WHERE placas LIKE ?',
//          [`%${busqueda}%`],
//          (err, results) => {
//            if (err) {
//              console.error('Error al consultar la base de datos:', err);
//              res.render('inicio', { error: 'Error al realizar la búsqueda' });
//            } else {
//              res.render('inicio', { data: results });
//            }
//          }
//        );
//      }
//    });
//  };
//controller.search = (req, res) => {
//    const { busqueda } = req.body;
//    req.getConnection((err, conn) => {
//      if (err) {
//        console.error('Error de conexión a la base de datos:', err);
//        res.render('inicio', { error: 'Error de conexión a la base de datos' });
//      } else {
//        conn.query(
//          'SELECT * FROM registro WHERE productor LIKE ?',
//          [`%${busqueda}%`],
//          (err, results) => {
//            if (err) {
//              console.error('Error al consultar la base de datos:', err);
//              res.render('inicio', { error: 'Error al realizar la búsqueda' });
//            } else {
//              res.render('inicio', { data: results });
//            }
//          }
//        );
//      }
//    });
//  };
controller.lists = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM sorteo ', (err, sorteo) =>{
            if(err){
                res.json(err);
            }
            console.log(sorteo);
            res.render('sorteo',{
                data: sorteo
            })//enlistar datos
        });
    });
};
controller.saves = (req, res)=>{
    const data= req.body;
    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO sorteo set ?', [data]);
            res.redirect("/sorteo");
        });//agregar datos
};
controller.deletes = (req, res) => {
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

        conn.query('DELETE FROM sorteo WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.error("Error al ejecutar la consulta:", err);
                return res.status(500).send("Error al ejecutar la consulta");
            }
            res.redirect('/sorteo');
        });
    });
};



controller.edits = (req, res) =>{
    const { id } = req.params;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM sorteo WHERE id = ?',[id], (err, data)=>{
            console.log(data);
            res.render('sorteoedit', {
                data:data[0]
            })
      });
    })
};

controller.updates = (req, res) =>{
    const { id } = req.params;
    const sregis = req.body;
    req.getConnection((err, conn)=>{
        conn.query('UPDATE sorteo set ? WHERE id = ?', [sregis, id], (err, rows)=>{
            res.redirect('/sorteo');
        });
    })
};


module.exports = controller;