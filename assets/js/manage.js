/*jslint browser: true, devel: true, browser: true, white: true*/
/*global $, jQuery, alert*/
import Pizza from {
    pizza
};
var Pizza = Pizza;

var Ingredient = (function () {
    "use strict";

    var self = {
        loadList: function () {
            return $.post(
                'app/manageIngredient.php', {
                    action: "getIngredient"
                },
                function (data) {},
                'text'
            );
        }
    };

    return self;
}());


function getIngredient() {
    "use strict";
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
}


/**************
    Deleters
**************/



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
    Pizza.Filler.getPizza();
    getIngredient();
});


$(".manageIngredients").on("click", "div.ingredient button.addIngredient", function () {
    "use strict";

    $(".manageIngredients").append("<div class=\"ingredient\"><label>Ingrédient </label><select><option disabled selected>Ingrédient</option></select><button type=\"button\" class=\"delIngredient\">-</button><button type=\"button\" class=\"addIngredient\">+</button></div>");
});

$(".manageIngredients").on("click", "div.ingredient button.delIngredient", function () {
    "use strict";

    $(this).parent().remove();
});
