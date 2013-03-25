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
  promptColor: function() {
    var cssColor = prompt("Please enter a CSS color:");
    this.set({color: cssColor});
  }
});

/* =================================================
 * VIEW
 */
var Comment = Backbone.View.extend({

  tagName: "li",

  className: "document-row",

  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
      
  }

});

/* =================================================
 * COLLECTION
 */
var Library = Backbone.Collection.extend({
  model: Book
});

/* =================================================
 * EVENTS
 */