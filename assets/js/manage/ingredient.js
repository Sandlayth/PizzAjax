/*jslint white: true*/

define([
    'jquery'
], function ($) {
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
});
