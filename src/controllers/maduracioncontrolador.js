const controller = {};



controller.lista = (req, res) =>{
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM maduracion ', (err, maduracion) =>{
            if(err){
                res.json(err);
            }
            console.log(maduracion);
            res.render('maduracion',{
                data: maduracion
            })//enlistar datos
        });
    });
}
module.exports = controller;