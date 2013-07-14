<?php

class DBConnector {
    protected static $conn;
    protected static $stmt;
    protected static $reflection;
    protected static $sql;
    protected static $data;
    protected static $results;
    
    protected static function connect(){
        self::$conn = new mysqli("host", "user", "pass", "dbname");
    }
    
    // Crea un statement a partir de $sql
    protected static function prepare(){
        self::$stmt = self::$conn->prepare(self::$sql);
        self::$reflection = new ReflectionClass("mysqli_stmt");
    }
    
    // Sustituye en $stmt las ? por los datos
    protected static function setParams(){
        $method = self::$reflection->getMethod("bind_param");
        $method->invokeArgs(self::$stmt, self::$data);
    }
    
    // Almacena los datos de la consulta en $results
    protected static function getData($fields){
        $method = self::$reflection->getMethod("bind_result");
        $method->invokeArgs(self::$stmt, $fields);
        while(self::$stmt->fetch()) {
            // Serializo y deserializo para hacer una copia de cada $fields
            self::$results[] = unserialize(serialize($fields));
        }
    }
    
    // Cerrar la conexión a la DB
    protected static function finish(){
        self::$sql->close();
        self::$conn->close();
    }
    
    // Ejecuta las sentencias SQL
    public static function execute($sql, $data, $fields=FALSE){
        self::$sql = $sql;
        self::$data = $data;
        self::connect();
        self::prepare();
        self::setParams();
        self::$stmt->execute();
        if($fields){
            self::getData($fields);
            // devolver results
            // return 
        } else {
            if(strpos(self::$sql, strtoupper("INSERT")) === 0){
                // devolver algo como true or false
                // return self::$stmt->insert_id;
            }
        }
        self::finish();
    }
}

?>
