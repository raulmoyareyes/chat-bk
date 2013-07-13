<?php

function insertarCometario($id, $nombre, $comentario) {
    
    $query = "Insert ($id, $nombre, $comentario)";

}

function devolverComentarios($time) {

    return "Comentarios";
}
//
//$con = mysqli_connect("example.com", "peter", "abc123", "my_db");
//
//if (mysqli_connect_errno($con)) {
//    echo "Fallo al conectar a MySQL: " . mysqli_connect_error();
//}

if ($_POST["id"] != null){
    
    $id = htmlspecialchars($_POST["id"]);
    $nombre = htmlspecialchars($_POST["nombre"]);
    $comentario = htmlspecialchars($_POST["comentario"]);
    
    insertarCometario($id, $nombre, $comentario);
    
} else {
    devolverComentarios(0);
}

//mysqli_close($con);

?>
