/*global define*/
/*jslint white: true*/

define([
    'ingredient',
    'jquery'
], function (Ingredient, $) {
    "use strict";
    var self = {
        getIngredient: function () {
            Ingredient.loadList().then(function (data) {
                data = $.parseJSON(data);

                $("#ingredientList").html("<h1>Liste des ingrédients</h1> <hr> Il n'y a aucun ingrédient !");
                if (data.length !== 0) {
                    $("#ingredientList").html("");
                    $.each(data.idIngredient, function (key, value) {
                        $("#ingredientList").append("<hr> <div><strong>" + value.name + "</strong><button id=\"ingredientid" + value.idIngredient + "\" type=\"button\">Supprimer</button></div>");
                    });
                }

            });
        },
        delIngredient: function (id) {
            $.post(
                'app/manageIngredient.php', {
                    action: "delIngredient",
                    id: id
                },
                function (data) {},
                'text'
            ).then(self.getIngredient());
        },

        addIngredient: function () {
            $.post(
                'app/manageIngredient.php', {
                    action: "addIngredient",
                    name: $("#addIngredient input[name=name]").val()
                },
                function (data) {},
                'text'
            ).then(self.getIngredient());
        }

    };
    return self;
});
