<?php

include './DBConnector.php';

if (isset($_POST["id"])){
    
    $id = htmlspecialchars($_POST["id"]);
    $nombre = htmlspecialchars($_POST["nombre"]);
    $comentario = htmlspecialchars($_POST["comentario"]);
    
    insertarCometario($id, $nombre, $comentario);
    
} else {
    devolverComentarios(0);
}

function insertarCometario($id, $nombre, $comentario) {
    
    $query = "Insert ($id, $nombre, $comentario)";

}

function devolverComentarios($time) {

    return "Comentarios";
}

?>
