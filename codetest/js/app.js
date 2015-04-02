/**
 * Created by Hamster on 3/20/2015.
 */
'use strict';

var ontra = angular.module('OntraApp',
	[
		'OntraApp.controllers',
		'OntraApp.services',
		'ngRoute',
		'ui.bootstrap'
	]).
	config(['$routeProvider', function ($routeProvider)
	{
		$routeProvider.
			when("/ticker", {templateUrl: "views/ticker.html", controller: "TickerController"}).
			when('/clear', {templateUrl: "views/clear.html", controller: "ClearController"}).
			otherwise({redirectTo: '/ticker/'});
	}]);

