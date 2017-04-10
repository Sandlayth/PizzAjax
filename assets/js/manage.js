// Adding pizza
/*jslint browser: true, devel: true, browser: true*/
/*global $, jQuery, alert*/

/**************
    Getters
**************/
function getPizza() {
    "use strict";
    $.post(
        'app/managePizza.php', {
            action: "getPizza"
        },
        function (data) {
            data = $.parseJSON(data);
            $("#pizzaList").html("<h1>Liste des pizzas</h1> <hr> Il n'y a aucune pizza !");
            if (data.length != 0) {
                $("#pizzaList").html("");
                $.each(data.idPizza, function (key, value) {
                    if (!value.description.trim()) {
                        value.description = "Aucune description";
                    }

                    $("#pizzaList").append("<hr> <div><strong>" + value.name + "</strong> <span>: " + value.description + " |" + value.price + " € </span><button id=\"pizzaid" + value.idPizza + "\" type=\"button\">Supprimer</button></div>");
                });
            }
        },
        'text'
    );
}

function getIngredient() {
    "use strict";
    $.post(
        'app/manageIngredient.php', {
            action: "getIngredient"
        },
        function (data) {
            data = $.parseJSON(data);
            $("#ingredientList").html("<h1>Liste des ingrédients</h1> <hr> Il n'y a aucun ingrédient !");
            if (data.length != 0) {
                $("#ingredientList").html("");
                $.each(data.idIngredient, function (key, value) {
                    $("#ingredientList").append("<hr> <div><strong>" + value.name + "</strong><button id=\"ingredientid" + value.idIngredient + "\" type=\"button\">Supprimer</button></div>");
                });
            }
        },
        'text'
    );
}

/**************
    Deleters
**************/

$("#pizzaList").on("click", "button", function () {
    "use strict";
    $.post(
        'app/managePizza.php', {
            action: "delPizza",
            id: $(this).attr("id").substr(7)
        },
        function (data) {
            getPizza();
        },
        'text'
    );
});

$("#ingredientList").on("click", "button", function () {
    "use strict";
    $.post(
        'app/manageIngredient.php', {
            action: "delIngredient",
            id: $(this).attr("id").substr(7)
        },
        function (data) {
            getIngredient();
        },
        'text'
    );
});


/**************
    Adders
**************/

$("#addPizza button").click(function () {
    "use strict";
    $.post(
        'app/managePizza.php', {
            action: "addPizza",
            name: $("#addPizza input[name=name]").val(),
            description: $("#addPizza textarea[name=description]").val(),
            price: $("#addPizza input[name=price]").val()
        },
        function (data) {
            getPizza();
        },
        'text'
    );
});

$("#addIngredient button").click(function () {
    "use strict";
    $.post(
        'app/manageIngredient.php', {
            action: "addIngredient",
            name: $("#addIngredient input[name=name]").val()
        },
        function (data) {
            getIngredient();
        },
        'text'
    );
});

$(document).ready(function () {
    "use strict";
    getPizza();
    getIngredient();

});