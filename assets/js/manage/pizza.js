/*jslint white: true*/

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
                function (data) {},
                'text'
            );
        }
    };

    return self;
});
