/**
 * Created by Hamster on 3/20/2015.
 */
'use strict';

var ontra = angular.module('OntraApp',
	[
		'OntraApp.controllers',
		'OntraAppServices',
		'ngRoute'
	]).
	config(['$routeProvider', function ($routeProvider)
	{
		$routeProvider.
			when("/ticker", {templateUrl: "views/ticker.html", controller: "TickerController"}).
			otherwise({redirectTo: '/ticker/'});
	}]);

