/* global Ontraport, $ */


window.Ontraport = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        new Ontraport.Views.Userview();
        new Ontraport.Views.Postsview();
    }
};

$(document).ready(function () {
    'use strict';
    Ontraport.init();
});
