/* 
 Document   : js
 Created on : 17-mar-2013, 19:18:46
 Author     : Raúl Moya Reyes
 Description:
 Implementación en Javascript de la parte lógica 
 utilizando Backbone (MVC)
 */


$(document).ready(function(){

/* =================================================
 * MODEL
 */
var Item = Backbone.Model.extend({
    default: function() {
        return {
            id: cItems.nextId(),
            name: "anonymous",
            comment: "none"
        };
    },
    validate: function(attributes){
        if(attributes.name === ""){return "Nombre vacío";}
    }
});


/* =================================================
 * COLLECTION
 */
var CollectionItems = Backbone.Collection.extend({
    model: Item,
    nextId: function() {
        if (!this.length)
            return 1;
        return this.last().get('id') + 1;
    },
    comparator: 'id'
});

var cItems = new CollectionItems;


/* =================================================
 * VIEW 
 */

// vista para cada comentario
var Comment = Backbone.View.extend({
    tagName: "div",
    className: "item",
    // Asignamos el template a nuestra vista
    template: _.template($('#item-template').html()),
    initialize: function() {
        // Es un método de Underscore para guardar una referencia del
        // objeto this en todos los métodos de esta clase.
        _.bindAll(this);
        
        // Escucha el evento destroy del modelo de esta vista y llama al
        // método remove de esta vista.
        this.listenTo(this.model, 'destroy', this.remove);
    },
    // asociamos cada evento de un selector a una función.
    events: {
        "click .close": "clear"
    },
    render: function() {
        // Añado el html del template, al que hay que pasarle un objeto en 
        // Json. Le paso el modelo que pertenece a esta vista.
        this.$el.hide();
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.fadeIn('slow');
        return this;
    },
    clear: function() {
        // Destruyo el modelo de esta vista y por consiguiente la vista por 
        // el evento que recojo arriba.
        this.model.destroy();
    }
});

// vista para la aplicación general
var AppView = Backbone.View.extend({
    el: $("#app"),
    // Asignamos el template a nuestra vista
    statsTemplate: _.template($('#stats-template').html()),
    initialize: function() {
        // Es un método de Underscore para guardar una referencia del
        // objeto this en todos los métodos de esta clase.
        _.bindAll(this);

        // Manejadores para los eventos producidos por la colección
        this.listenTo(cItems, 'add', this.added);
        this.listenTo(cItems, 'all', this.render);
    },
    render: function() {
        this.$("#footer").html(this.statsTemplate({nComments: cItems.length}));
        return this;
    },
    // Al crear un nuevo elemento en cItems llama al metodo add y se crea una 
    // vista para el comentario
    added: function(item) {
        var vComment = new Comment({model: item});
        this.$("#comment-list").prepend(vComment.render().el);
    },
    events: {
        // Añado el evento para que al hacer click crear un comentario
        "click #button": "createComment"
    },
    createComment: function(){
        // Añado items a la colección cada vez que hago click en button
        cItems.add({name: this.$("#userItem").val(), comment: this.$("#insertItem").val()});
        this.$("#insertItem").val("");
    }
});

/* =================================================
 * Objeto de la vista principal para comenzar la app
 */

var app = new AppView();

cItems.add({name: this.$("#userItem").val(), comment: this.$("#insertItem").val()});

$.getJSON("data/data.json", function(data){
    
});

});
