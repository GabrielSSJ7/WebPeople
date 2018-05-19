/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var arrFormList = [];
var produtoSelecionado;
var app = angular.module("myApp", []);

app.controller("meuController", function ($scope, $http, $compile) {

    $scope.teste = "testee";

    $scope.site_institucional = function(){
                    $(".div-produtos").fadeOut();
                    $(".class-produto").fadeOut();
                    $("#form_2").fadeIn();
                    produtoSelecionado = "form-site-institucional.json";
                    getFormPardao($http, $scope, $compile);
                };     

});

function getFormProduct($http, $scope, $compile, produtoSelecionado){
    $http.get('json/'+produtoSelecionado).then(
            function (response) {

                var perguntaAtual = 0, varTroca, jsonList = [], respostaEmail = "";

                jsonList = response.data.perguntas;

                if (perguntaAtual == 0) {
                    if (!jsonList[0].temResposta) {
                console.log(perguntaAtual);

                        console.log(jsonList[0].html);
                        angular.element(document.getElementById('form_2'))
                                .append($compile(jsonList[0].html)($scope));
                    }else{
                    
                        respostaEmail = respostaEmail + "<br>" + "<strong>" + jsonList[perguntaAtual].pergunta + "</strong>";

                        var listaRespostas = jsonList[perguntaAtual].respostas, x;
                        
                        for (x = 0; x < listaRespostas.length; x++){

                            var checked, id = '#'+listaRespostas[x];

                            if($('#'+listaRespostas[x]).is(':checked')){
                                respostaEmail = respostaEmail +  "<br>" + listaRespostas[x] + "</br>";
                            }

                        }
                           
                        
                        $("#right-panel").fadeIn();
                        $("#right-panel").html(respostaEmail);

                        

                        angular.element(document.getElementById('form_2')).empty();
                        angular.element(document.getElementById('form_2')).append($compile(jsonList[perguntaAtual].html)($scope));
                        
                    }
                }

                $scope.nextFormProduct = function () {
                    console.log(perguntaAtual);
                    console.log(jsonList.length-1);
                    if (perguntaAtual >= jsonList.length-1) {
                        //getFormProduct($http, $scope, $compile, produtoSelecionado);
                    }else{
                        
                        if (!jsonList[perguntaAtual].temResposta) {


                        respostaEmail = respostaEmail + "<br>" + "<strong>" + jsonList[perguntaAtual].pergunta + "</strong>" + "<br>" + $scope.resNomeEmpresa + "<br>";

                        $("#right-panel").fadeIn();
                        $("#right-panel").html(respostaEmail);

                        perguntaAtual += 1;

                        angular.element(document.getElementById('form_2')).empty();

                        angular.element(document.getElementById('form_2'))
                                .append($compile(jsonList[perguntaAtual].html)($scope));

                    }else{
                    
                        respostaEmail = respostaEmail + "<br>" + "<strong>" + jsonList[perguntaAtual].pergunta + "</strong>";

                        var listaRespostas = jsonList[perguntaAtual].respostas, x;
                        
                        for (x = 0; x < listaRespostas.length; x++){

                            var checked, id = '#'+listaRespostas[x];

                            if($('#'+listaRespostas[x]).is(':checked')){
                                respostaEmail = respostaEmail +  "<br>" + listaRespostas[x] + "</br>";
                            }

                        }
                           
                        
                        $("#right-panel").fadeIn();
                        $("#right-panel").html(respostaEmail);

                        perguntaAtual += 1;

                        angular.element(document.getElementById('form_2')).empty();
                        angular.element(document.getElementById('form_2')).append($compile(jsonList[perguntaAtual].html)($scope));
                        
                    }
                    }

                };

            });

}

function getFormPardao($http, $scope, $compile){

     $http.get('json/form-padrao.json').then(
            function (response) {

                var perguntaAtual = 0, varTroca, jsonList = [], respostaEmail = "";
                jsonList = response.data.perguntas;

                console.log(jsonList);

                if (perguntaAtual == 0) {
                    if (!jsonList[0].temResposta) {

                        angular.element(document.getElementById('form_2'))
                                .append($compile(jsonList[0].html)($scope));
                    }
                }

                $scope.next = function () {
                    
                    if (perguntaAtual >= jsonList.length-1) {
                        
                        getFormProduct($http, $scope, $compile, produtoSelecionado);
                    }else{
                        console.log(perguntaAtual);
                        if (!jsonList[perguntaAtual].temResposta) {


                        respostaEmail = respostaEmail + "<br>" + "<strong>" + jsonList[perguntaAtual].pergunta + "</strong>" + "<br>" + $scope.resNomeEmpresa + "<br>";

                        $("#right-panel").fadeIn();
                        $("#right-panel").html(respostaEmail);

                        perguntaAtual += 1;

                        angular.element(document.getElementById('form_2')).empty();

                        angular.element(document.getElementById('form_2'))
                                .append($compile(jsonList[perguntaAtual].html)($scope));

                    }else{
                    
                        respostaEmail = respostaEmail + "<br>" + "<strong>" + jsonList[perguntaAtual].pergunta + "</strong>";

                        var listaRespostas = jsonList[perguntaAtual].respostas, x;
                        
                        for (x = 0; x < listaRespostas.length; x++){

                            var checked, id = '#'+listaRespostas[x];

                            if($('#'+listaRespostas[x]).is(':checked')){
                                respostaEmail = respostaEmail +  "<br>" + listaRespostas[x] + "</br>";
                            }

                        }
                           
                        
                        $("#right-panel").fadeIn();
                        $("#right-panel").html(respostaEmail);

                        perguntaAtual += 1;

                        angular.element(document.getElementById('form_2')).empty();
                        angular.element(document.getElementById('form_2')).append($compile(jsonList[perguntaAtual].html)($scope));
                        
                    }
                    }

                };

            });
 }

function getScope(ctrlName) {
    var sel = 'div[ng-controller="' + ctrlName + '"]';
    return angular.element(sel).scope();}

function preparaPerguntaFormPadrao(listaDePerguntas) {

    var x;
    var firstQuestion = 0;

    for (x = 0; x < listaDePerguntas.length; x++) {
        // console.log(listaDePerguntas[x].html);
        if (listaDePerguntas[x].temResposta) {

            var respostas = listaDePerguntas[x].respostas;

            for (var y = 0; y < respostas.length; y++) {
                //console.log("  " + y + " . " + respostas[y]);
            }
        }
    }}

