/*global define*/
/*jslint white: true*/

define([
    'jquery'
], function ($) {
    "use strict";

    var self = {
        // IngredientFiller

        emptyIngredientList: function () {
            $("#ingredientList").html("<h1>Liste des ingrédients</h1> <hr> Il n'y a aucun ingrédient !");
        },
        fillIngredientList: function (data) {
            $("#ingredientList").html("");
            $.each(data.idIngredient, function (key, value) {
                $("#ingredientList").append("<hr> <div><strong>" + value.name + "</strong><button id=\"ingredientid" + value.idIngredient + "\" type=\"button\">Supprimer</button></div>");
            });
        },
        getIngredientId: function () {
            return $("#addIngredient input[name=name]").val();
        },

        // PizzaFiller

        emptyPizzaList: function () {
            $("#pizzaList").html("<h1>Liste des pizzas</h1> <hr> Il n'y a aucune pizza !");
        },
        fillPizzaList: function (data) {
            $("#pizzaList").html("");
            $.each(data.pizza, function (key, value) {
                if (!value.description.trim()) {
                    value.description = "Aucune description";
                }

                $("#pizzaList").append("<hr> <div><strong>" + value.name + "</strong> <span>: " + value.description + " |" + value.price + " € </span><button id=\"pizzaid" + value.idPizza + "\" type=\"button\">Supprimer</button></div>");
            });
        },
        getPizzaName: function () {
            return $("#addPizza input[name=name]").val();
        },
        getPizzaDescription: function () {
            return $("#addPizza textarea[name=description]").val();
        },
        getPizzaPrice: function () {
            return $("#addPizza input[name=price]").val();
        },
        getPizzaIngredient: function () {
            return $(".manageIngredients select option:selected").map(function () {
                return $(this).attr("value");
            }).get();
        },
        addPizzaIngredient: function () {
            var ingredient = $("<div class=\"ingredient\"><label>Ingrédient </label><select><option disabled selected>Ingrédient</option></select><button type=\"button\" class=\"delIngredient\">-</button><button type=\"button\" class=\"addIngredient\">+</button></div>");

            return ingredient.appendTo(".manageIngredients").children("select");

        },
        delPizzaIngredient: function (obj) {
            obj.parent().remove();
        },
        fillIngredientPizzaList: function (data, obj) {
            obj.html("<option disabled selected>Ingrédient</option>");

            $.each(data.idIngredient, function (key, value) {
                obj.append("<option value=\"" + value.idIngredient + "\">" + value.name + "</value>");
            });
        }
    };

    return self;
});
