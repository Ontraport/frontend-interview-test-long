'use strict';

require('angular/angular');

var ontraportApp = angular.module('ontraportApp', []);

require('./controllers/userController.js')(ontraportApp);
