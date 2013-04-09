/* 
    Document   : js
    Created on : 17-mar-2013, 19:18:46
    Author     : Raúl Moya Reyes
    Description:
        Implementación en Javascript de la parte lógica
*/

$(document).ready(function(){

    var items = new Content();
    
    $("#button").click(function(){
        var comment = $("textarea[name=insertItem]").val();
        var name = $("input[name=userItem]").val();
        if(comment !== "" && name!==""){
            var newComment = new Item(name, comment);
            items.insertar(newComment);
            var pos = items.tam();
            if(pos>0){   
                items.leer(pos).render();
            }
            $("textarea[name=insertItem]").val("");
        }
    });
    
    $(document).on("click", ".close", function(){
        items.borrar(items.buscar(($(this).id).substring(($(this).id).length-2,($(this).id).length)));
    });
    
    $(document).bind('submit', function (event) {
        return false;
    });
    
/* =================================================
 * Lectura desde JSON
 */
    $(function(){
        var arrayItems = new Array();

        $.getJSON("data/data.json", function(data){
            for(var i=0; i<data.length; i++){
                arrayItems.push(data[i]);
            }
        });

        setInterval(function(){
            var r = Math.random();
            r = Math.floor(Math.random()*arrayItems.length);
            var aux = new Item(arrayItems[r].name, arrayItems[r].comment); // esta línea se añade
            items.insertar(aux);
        },3000);

    });
});


/* ===========================================================
 * CLASS ITEM
 */

// CONSTRUCT
function Item(name, comment){
    this.name = name;
    this.coment = comment;
    this.id;
}

// métodos
Item.prototype.render = function(){
    $("#comment-list").prepend("<div id='item"+this.id+"' class='item'></div>");
    $("#item"+this.id).append("<div class='user'>Escrito por: "+this.name+"</div>");
    $("#item"+this.id).append("<div class='comment'>"+this.coment+"</div>");
    $("#item"+this.id).append("<button class='close'>&times;</button>");
    $("#item"+this.id).css('visibility','visible').hide().fadeIn('slow');
};
Item.prototype.clear = function() {
    $("#"+this.id).remove();
};

/* ===========================================================
 * CLASS CONTENT
 */
function Content(){
    this.array = new Array();
}

// métodos
Content.prototype.insertar = function(dato) {
    this.array.push(dato);
    this.leer(this.array.length-1).render();
};

Content.prototype.leer = function(pos) {
    if(pos>=0){
        return this.array[pos];
    } else {
        return -1;
    }
};

Content.prototype.borrar = function(pos) {
    this.array[pos].clear();
    this.array.splice(pos,1);
};

Content.prototype.buscar = function(id) {
    var pos = 0;
    // buscar id en el array
    return pos;
};

Content.prototype.tam = function() {
    return this.array.length;
};