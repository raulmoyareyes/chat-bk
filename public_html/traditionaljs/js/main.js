/* 
    Document   : js
    Created on : 17-mar-2013, 19:18:46
    Author     : Raúl Moya Reyes
    Description:
        Implementación en Javascript de la parte lógica
*/

$(document).ready(function(){

    var items = new Array();
    
    $("#button").click(function(){
        var comment = $("textarea[name=insertItem]").val();
        var name = $("input[name=userItem]").val();
        if(comment !== "" && name!==""){
            var newComment = new Item(items.length, name, comment);
            newComment.render();
            newComment.addToJSON();
            items.push(newComment);
            console.log(items.length);
            $("textarea[name=insertItem]").val("");
        }
    });
    
    $(document).on("click", ".close", function(){
        $(this).parent().remove();
    });
    
    $(document).bind('submit', function (event) {
        return false;
    });
    
    $.getJSON("data/data.json", function(data){
        for(var i=items.length; i<data.length; i++){
            var aux = new Item(data[i].id, data[i].name, data[i].comment);
            items.push(aux);
        }
    });

    // simulacion de que llegan comentarios
    // aquí debería hacer las peticiones ajax para los comentarios nuevos
    setInterval(function(){
        var r = Math.random();
        r = Math.floor(Math.random()*items.length);
        items[r].render();
    },3000);
});


/* ===========================================================
 * CLASS ITEM
 */

// CONSTRUCT
function Item(id, name, comment){
    this.name = name;
    this.coment = comment;
    this.id = id;
}

// METHOD OF ITEM
Item.prototype.render = function(){
    $(".list").prepend("<div id='item"+this.id+"' class='item'></div>");
    $("#item"+this.id).append("<div class='user'>Escrito por: "+this.name+"</div>");
    $("#item"+this.id).append("<div class='comment'>"+this.coment+"</div>");
    $("#item"+this.id).append("<button class='close'>&times;</button>");
    $("#item"+this.id).css('visibility','visible').hide().fadeIn('slow');
};

Item.prototype.addToJSON = function(){
    //no la implemento por ahora
};

