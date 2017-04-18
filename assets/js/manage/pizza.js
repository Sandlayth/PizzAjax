/*jslint white: true*/
/*global define*/
define([
    'jquery'
], function ($) {
    "use strict";

    var self = {
        loadList: function () {
            return $.post(
                'app/managePizza.php', {
                    action: "getPizza"
                },
                function (data) {
                    data = $.parseJSON(data);
                    var pizzas = data.pizza.reduce((m, {
                        idPizza,
                        name,
                        price,
                        ingredient
                    }) => m.set(idPizza, {
                        idPizza,
                        name,
                        price,
                        ingredients: (m.get(idPizza) || {
                            ingredients: new Set()
                        }).ingredients.add(ingredient)
                    }), new Map())

                },
                'text'
            );
        }
    };

    return self;
});
