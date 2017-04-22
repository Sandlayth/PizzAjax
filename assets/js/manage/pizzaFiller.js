/*global define*/
/*jslint white: true, */

define([
    'pizza',
    'jquery',
    'ingredient',
    'view'
], function (Pizza, $, Ingredient, View) {
    "use strict";
    var self = {
        getPizza: function () {
            return Pizza.loadList().then(function (data) {
                data = $.parseJSON(data);
                data = data.pizza.reduce((m, {
                    idPizza,
                    name,
                    description,
                    price,
                    ingredient
                }) => m.set(idPizza, {
                    idPizza,
                    name,
                    description,
                    price,
                    ingredients: (m.get(idPizza) || {
                        ingredients: new Set()
                    }).ingredients.add(ingredient)
                }), new Map());
                View.emptyPizzaList();
                if (data.length !== 0) {
                    View.fillPizzaList(data);
                }
            });
        },
        addPizza: function () {
            return $.post(
                'app/managePizza.php', {
                    action: "addPizza",
                    name: View.getPizzaName(),
                    description: View.getPizzaDescription(),
                    price: View.getPizzaPrice(),
                    idIngredients: View.getPizzaIngredient()
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
            var obj = View.addPizzaIngredient();
            self.getIngredient(obj);
        },
        delIngredient: function (obj) {
            View.delPizzaIngredient(obj);
        },
        getIngredient: function (obj) {
            Ingredient.loadList().then(function (data) {
                data = $.parseJSON(data);

                if (data.length !== 0) {
                    View.fillIngredientPizzaList(data, obj);
                }

            });
        }
    };
    return self;
});
