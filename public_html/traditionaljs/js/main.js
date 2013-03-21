/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    var count=0;
    
    $("#button").click(function(){
        var toAdd = $("textarea[name=insertItem]").val();
        var user = $("input[name=userItem]").val();
        if(toAdd !== "" && user!==""){
            $(".list").prepend("<div id='item"+count+"' class='item'></div>");
            $("#item"+count).append("<div class='user'>Escrito por: "+user+"</div>");
            $("#item"+count).append("<div class='comment'>"+toAdd+"</div>");
            $("#item"+count).append("<button class='close'>&times;</button>");
            $("#item"+count).css('visibility','visible').hide().fadeIn('slow');
            $("textarea[name=insertItem]").val("");
            count++;
        }
    });
    
    $(document).on("click", ".close", function(){
        $(this).parent().remove();
    });
    
    $(document).bind('submit', function (event) {
        return false;
    });
});


/*
 * 
 * 
$sql = "SELECT ID, POBLACION, NUMVISITAS FROM VISITAS_CENTROS";
 
$resulset = mysql_query($sql, $_SESSION["idBD"])
 
$arr = array();
while ($obj = mysql_fetch_object($resulset)) {
    $arr[] = array('ID' => $obj->ID,
                   'P' => utf8_encode($obj->POBLACION),
                   'NV' => $obj->NUMVISITAS,
        );
}
echo '' . json_encode($arr) . '';
 * 
 * 
 * 
 * 
 * 
 * 
$.ajax({
        type: "POST",
        url:"getData.php",
        async: true,
        success: function(datos){
            var dataJson = eval(datos);
             
            for(var i in dataJson){
                alert(dataJson[i].ID + " _ " + dataJson[i].P + " _ " + dataJson[i].NV);
            }
             
        },
        error: function (obj, error, objError){
            //avisar que ocurrió un error
        }
});
 * 
 * 
 */
