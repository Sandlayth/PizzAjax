/*global require, requirejs */
requirejs.config({
    baseUrl: 'assets/js/manage',
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min'
    }
});

require([
    'pizzaFiller',
    'jquery',
    'ingredientFiller'
], function (PizzaFiller, $, IngredientFiller) {
    "use strict";
    PizzaFiller.getPizza();
    PizzaFiller.getIngredient($(".ingredient select"));
    IngredientFiller.getIngredient();

    $("#pizzaList").on("click", "button", function () {
        PizzaFiller.delPizza($(this).attr("id").substr(7));
    });

    $("#addPizza .addPizza").click(function () {
        PizzaFiller.addPizza();
    });

    $("#ingredientList").on("click", "button", function () {
        IngredientFiller.delIngredient($(this).attr("id").substr(12));
    });

    $("#addIngredient button").click(function () {
        IngredientFiller.addIngredient();
    });

    $(".manageIngredients").on("click", "div.ingredient button.addIngredient", function () {
        PizzaFiller.addIngredient();
    });

    $(".manageIngredients").on("click", "div.ingredient button.delIngredient", function () {
        PizzaFiller.delIngredient($(this));
    });

});
