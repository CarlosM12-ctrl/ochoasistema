-- creacion bbdd
CREATE DATABASE ochoasistema;
-- utilizacion
use ochoasistema;
--crear tabla
CREATE TABLE registro{
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    producto VARCHAR(30) NOT NULL,
    cantidad INT(20) NOT NULL
};
--mostrar tablas
SHOW TABLES;

--estructura de tabla
describe registro;