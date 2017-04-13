/*jslint browser: true, devel: true, browser: true, white: true*/
/*global $, jQuery, alert*/

var Pizza = (function () {
    "use strict";

    var self = {
        loadList: function () {
            return $.post(
                'app/managePizza.php', {
                    action: "getPizza"
                },
                function (data) {},
                'text'
            );
        }
    };

    return self;
}());

var Pizza.Filler = (function () {
    var self = {
        getPizza: function () {
            return Pizza.loadList().then(function (data) {
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
        }
    }
    return self;
}());

module.exports = {
    Pizza,
    Pizza.Filler
};


$("#pizzaList").on("click", "button", function () {
    "use strict";
    $.post(
        'app/managePizza.php', {
            action: "delPizza",
            id: $(this).attr("id").substr(7)
        },
        function (data) {
            Pizza.getPizza();
        },
        'text'
    );
});

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
            Pizza.getPizza();
        },
        'text'
    );
});
