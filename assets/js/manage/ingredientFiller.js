/*global define*/
/*jslint white: true*/

define([
    'ingredient',
    'jquery',
    'view'
], function (Ingredient, $, View) {
    "use strict";
    var self = {
        getIngredient: function () {
            Ingredient.loadList().then(function (data) {
                data = $.parseJSON(data);

                View.emptyIngredientList();
                if (data.length !== 0) {
                    View.fillIngredientList(data);
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
                    name: View.getIngredientId()
                },
                function (data) {},
                'text'
            ).then(self.getIngredient());
        }

    };
    return self;
});
