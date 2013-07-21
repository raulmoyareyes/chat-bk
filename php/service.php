<?php

include './DBConnector.php';
//error_reporting(0);

// cambiar a POST
if (isset($_GET["id"])) {

    $id = htmlspecialchars($_GET["id"]);
    $nombre = htmlspecialchars($_GET["user"]);
    $comentario = htmlspecialchars($_GET["comment"]);
    $date = htmlspecialchars($_GET["date"]);

    insertarCometario($id, $date, $nombre, $comentario);
} else {
    if(isset($_GET["date"])){
        $date = htmlspecialchars($_GET["date"]);
    }else{ $date = 0; }
    print(json_encode(devolverComentarios($date)));
}

function insertarCometario($id, $date, $nombre, $comentario) {

    $query = "INSERT INTO cmchat (id,date,name,comment) VALUES (?,?,?,?)";
    $data = array("iiss", "{$id}","{$date}","{$nombre}","{$comentario}");
    $id_insert = DBConnector::execute($query, $data);
    
    return $id_insert;
}

function devolverComentarios($timestamp) {

    $query = "SELECT name, comment FROM cmchat WHERE date>?";
    $data = array("i","{$timestamp}");
    $fields = array("name" => "", "comment" => "");
    $comments = DBConnector::execute($query, $data, $fields);

    return $comments;
}

?>
