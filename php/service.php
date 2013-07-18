<?php

include './DBConnector.php';
//error_reporting(0);

// cambiar a POST
if (isset($_GET["id"])) {

    $id = htmlspecialchars($_GET["id"]);
    $nombre = htmlspecialchars($_GET["nombre"]);
    $comentario = htmlspecialchars($_GET["comentario"]);

    insertarCometario($id, $nombre, $comentario);
} else {
    print(json_encode(devolverComentarios()));
}

function insertarCometario($id, $nombre, $comentario) {

    $query = "INSERT INTO cmchat (id,name,comment) VALUES (?,?,?)";
    $data = array("iss", "{$id}","{$nombre}","{$comentario}");
    $id_insert = DBConnector::execute($query, $data);
    
    return $id_insert;
}

function devolverComentarios() {

    $query = "SELECT name, comment FROM cmchat";
    $data = 0;
    $fields = array("Nombre" => "", "Comentario" => "");
    $comments = DBConnector::execute($query, $data, $fields);

    return $comments;
}

?>
