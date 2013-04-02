/* 
 Document   : js
 Created on : 17-mar-2013, 19:18:46
 Author     : Raúl Moya Reyes
 Description:
 Implementación en Javascript de la parte lógica 
 utilizando Backbone (MVC)
 */


/* =================================================
 * MODEL
 */
var Item = Backbone.Model.extend({
    default: function() {
        return {
            id: cItems.nextId(),
            name: anonymous,
            comment: none
        };
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
    
    tagName: "li",
            
    // Asignamos el template a nuestra vista
    template: _.template($('#item-template').html()),
            
    initialize: function() {
        this.listenTo(this.model, 'destroy', this.remove);
    },
            
    events: {
        "click .close" : "destroy"
    },
            
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    
    destroy: function(){
        
    }
});

// vista para la aplicación general
var AppView = Backbone.View.extend({
    el: $(".list"),
    // Asignamos el template a nuestra vista
    template: _.template($('#app-template').html()),
    initialize: function() {
        // Es un método de Underscore para guardar una referencia del
        // objeto this en todos los métodos de esta clase.
        _.bindAll(this);

        // Manejadores para los eventos producidos por la colección
        this.listenTo(cItems, 'add', this.add);
        this.listenTo(cItems, 'destroy', this.remove);
    },
    events: {
        // evento selector: método
        "click .icon": "open" // es solo para mantener como se hace un evento
    },
    render: function() {
        return this;
    },
    remove: function() {

    },
    add: function() {

    }
});

/* =================================================
 * MAIN
 */
$(document).ready(function() {
    var app = new AppView();
});