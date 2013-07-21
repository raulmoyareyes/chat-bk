
/* 
 Document   : sql
 Created on : 18-jul-2013, 19:18:46
 Author     : Raúl Moya Reyes
 Description:
 Implementación de la Base de Datos
 */


/* =============================================================================
 * Tabla para almacenar los comentarios en SQL
 *
 * CREATE USER user IDENTIFIED BY 'password';
 * GRANT SELECT, INSERT ON *.* TO 'user'@'localhost';
 */

CREATE TABLE IF NOT EXISTS `cmchat` (
  `id` int(10) NOT NULL,
  `date` int(20) NOT NULL DEFAULT 0,
  `name` varchar(20) DEFAULT 'Anonymous',
  `comment` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`,`date`)
)