/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){

    var items = new Array();
    
    $("#button").click(function(){
        var comment = $("textarea[name=insertItem]").val();
        var name = $("input[name=userItem]").val();
        if(toAdd !== "" && user!==""){
            var newComment = new Item(items.length, name, comment);
            newComment.render();
            newComment.addToJSON();
            items.push(newComment);
            console.log(items.length);
        }
    });
    
    $(document).on("click", ".close", function(){
        $(this).parent().remove();
    });
    
    $(document).bind('submit', function (event) {
        return false;
    });
    
    setInterval(function(){

        $.getJSON("data/data.json", loadData);

        function loadData(data){
            for(var i=items.length; i<data.length; i++){
                var aux = new Item(data[i].id, data[i].name, data[i].comment);
                aux.render();
                items.push(aux);
            }
        }

    },1000);
});


// CLASS ITEM
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
    $("textarea[name=insertItem]").val("");
};

Item.prototype.addToJSON = function(){
    
};

