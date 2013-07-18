<?php

/*
  Document   : php
  Created on : 10-jul-2013, 19:18:46
  Author     : Raúl Moya Reyes
  Description:
  Implementación de una capa de abstracción para la Base de Datos
 */


/* =============================================================================
 * CLASE DE ABSTRACCIÓN PARA LA DB
 * 
 * Uso con Select
 *      $query = "SELECT name, comment FROM cmchat WHERE id=?";
 *      $data = array("i","{$id}");
 *      $fields = array("Nombre" => "", "Comentario" => "");
 *      $comments = DBConnector::execute($query, $data, $fields);
 * 
 * Uso con Insert
 *      $query = "INSERT INTO 'cmchat' ('id','name','comment') VALUES(?,?,?)";
 *      $data = array("iss", "{$id}","{$nombre}","{$comentario}");
 *      $id_insert = DBConnector::execute($query, $data);
 *      
 */

class DBConnector {

    protected static $conn;
    protected static $stmt;
    protected static $reflection;
    protected static $sql;
    protected static $data;
    protected static $results;

    protected static function connect() {
        self::$conn = new mysqli("localhost", "user", "password", "pruebas");
    }

    // Crea un statement a partir de $sql
    protected static function prepare() {
        self::$stmt = self::$conn->prepare(self::$sql);
        self::$reflection = new ReflectionClass("mysqli_stmt");
    }

    // Sustituye en $stmt las ? por los datos
    protected static function setParams() {
        $method = self::$reflection->getMethod("bind_param");
        $method->invokeArgs(self::$stmt, self::$data);
    }

    // Almacena los datos de la consulta en $results
    protected static function getData($fields) {
        $method = self::$reflection->getMethod("bind_result");
        $method->invokeArgs(self::$stmt, $fields);
        while (self::$stmt->fetch()) {
            // Serializo y deserializo para hacer una copia de cada $fields
            self::$results[] = unserialize(serialize($fields));
        }
    }

    // Cerrar la conexión a la DB
    protected static function finish() {
        self::$sql->close();
        self::$conn->close();
    }

    // Ejecuta las sentencias SQL
    public static function execute($sql, $data, $fields = FALSE) {
        self::$sql = $sql;
        self::$data = $data;
        self::connect();
        self::prepare();
        if (count(self::$data) > 1) {
            self::setParams();
        }
        self::$stmt->execute();
        if ($fields) {
            self::getData($fields);
            // devolver results
            return self::$results;
        } else {
            if (strpos(self::$sql, strtoupper("INSERT")) === 0) {
                // devolver algo como true or false
                return self::$stmt->insert_id;
            }
        }
        self::finish();
    }

}

?>
