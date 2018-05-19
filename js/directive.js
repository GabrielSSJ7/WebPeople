/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("myApp", []);

app.directive("w3TestDirective", function () {

    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            element.on('click', function () {
                element.html('You clicked me!');
            });
            element.on('mouseenter', function () {
                element.css('background-color', 'yellow');
            });
            element.on('mouseleave', function () {
                element.css('background-color', 'white');
            });
        }
    };
});