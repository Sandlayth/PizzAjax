/*global define*/
/*jslint white: true, */

define([
    'pizza',
    'jquery'
], function (pizza, $) {
    "use strict";
    var self = {
        getPizza: function () {
            return pizza.loadList().then(function (data) {
                data = $.parseJSON(data);

                $("#pizzaList").html("<h1>Liste des pizzas</h1> <hr> Il n'y a aucune pizza !");
                if (data.length !== 0) {
                    $("#pizzaList").html("");
                    $.each(data.idPizza, function (key, value) {
                        if (!value.description.trim()) {
                            value.description = "Aucune description";
                        }

                        $("#pizzaList").append("<hr> <div><strong>" + value.name + "</strong> <span>: " + value.description + " |" + value.price + " € </span><button id=\"pizzaid" + value.idPizza + "\" type=\"button\">Supprimer</button></div>");
                    });
                }
            });
        },
        addPizza: function () {
            return $.post(
                'app/managePizza.php', {
                    action: "addPizza",
                    name: $("#addPizza input[name=name]").val(),
                    description: $("#addPizza textarea[name=description]").val(),
                    price: $("#addPizza input[name=price]").val()
                },
                function (data) {},
                'text'
            ).then(self.getPizza());
        },
        delPizza: function (id) {
            return $.post(
                'app/managePizza.php', {
                    action: "delPizza",
                    id: id
                },
                function (data) {},
                'text'
            ).then(self.getPizza());
        },
        addIngredient: function () {
            $(".manageIngredients").append("<div class=\"ingredient\"><label>Ingrédient </label><select><option disabled selected>Ingrédient</option></select><button type=\"button\" class=\"delIngredient\">-</button><button type=\"button\" class=\"addIngredient\">+</button></div>");
        },
        delIngredient: function (obj) {
            obj.parent().remove();
        }
    };
    return self;
});
