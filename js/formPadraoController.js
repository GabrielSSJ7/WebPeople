/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var arrFormList = [];
var produtoSelecionado;
var app = angular.module("myApp", []);
var respostaEmail = "";
var perguntaAtual;
var jsonList;
var jsonListGlobal = [];
var respostaAnterior;

app.controller("meuController", function ($scope, $http, $compile) {

    $scope.teste = "testee";

    $scope.site_institucional = function () {
        $(".div-produtos").fadeOut();
        $(".class-produto").fadeOut();
        $("#form_2").fadeIn();
        produtoSelecionado = "form-site-institucional.json";
        getFormPardao($http, $scope, $compile);
    };

    $scope.voltar = function () {
        respostaAnterior[perguntaAtual] = respostaAnterior;
        //console.log(respostaAnterior);
        
        $("#right-panel").html(respostaAnterior[perguntaAtual]);

        angular.element(document.getElementById('form_2')).empty();
        angular.element(document.getElementById('form_2'))
        
                .append($compile(jsonList[perguntaAtual - 1].html)($scope));
        perguntaAtual = perguntaAtual -1;

    };

});

function getFormProduct($http, $scope, $compile, produtoSelecionado) {
    $http.get('json/' + produtoSelecionado).then(
            function (response) {
                perguntaAtual = 0;
                jsonList = [];

                jsonList = response.data.perguntas;

                // verificando se é a primeira pergunta
                if (perguntaAtual == 0) {
                    angular.element(document.getElementById('form_2')).append($compile(jsonList[0].html)($scope));
                }

                $scope.nextFormProduct = function () {
                    //Verificando se é a última pergunta do formulário                 
                    if (perguntaAtual >= jsonList.length - 1) {
                        //getFormProduct($http, $scope, $compile, produtoSelecionado);
                    } else {
                        Next(jsonList, $scope, $compile);
                    }
                };
            });
}
respostaAnterior = [];
function Next(jsonList, $scope, $compile) {
    jsonListGlobal = jsonList;
    
    // verificando se há respostas na pergunta
    if (!jsonList[perguntaAtual].temResposta) {


        respostaAnterior[perguntaAtual] = respostaEmail;
        // colocando a pergunta atual na resposta para o email
        respostaEmail = respostaEmail + "<br>" + "<strong>" + jsonList[perguntaAtual].pergunta + "</strong>";


        var inputs = jsonList[perguntaAtual].respostas;
        var resposta;

        for (var i = 0; i < inputs.length; i++) {
            var id = "#" + inputs;
            resposta = $(id).val();
            respostaEmail = respostaEmail + "<br>" + resposta + "</br>";
        }

        $("#right-panel").fadeIn();
        $("#right-panel").html(respostaEmail);

        console.log(respostaAnterior);
        perguntaAtual += 1;

        angular.element(document.getElementById('form_2')).empty();

        angular.element(document.getElementById('form_2'))
                .append($compile(jsonList[perguntaAtual].html)($scope));
    } else {

        respostaAnterior[perguntaAtual] = respostaEmail;
        respostaEmail = respostaEmail + "<br>" + "<strong>" + jsonList[perguntaAtual].pergunta + "</strong>";


        var listaRespostas = jsonList[perguntaAtual].respostas, x;

        for (x = 0; x < listaRespostas.length; x++) {

            var checked, id = '#' + listaRespostas[x];

            if ($('#' + listaRespostas[x]).is(':checked')) {

                respostaEmail = respostaEmail + "<br>" + listaRespostas[x] + "</br>";
            }
        }

        if ($("input[name='radio']").is(":checked")) {
            checked = $("input[name='radio']:checked").val();
            respostaEmail = respostaEmail + "<br>" + checked + "</br>";
        }

        $("#right-panel").fadeIn();
        $("#right-panel").html(respostaEmail);

        
        console.log(respostaAnterior);
        perguntaAtual += 1;

        angular.element(document.getElementById('form_2')).empty();
        angular.element(document.getElementById('form_2')).append($compile(jsonList[perguntaAtual].html)($scope));
    }
}
function getFormPardao($http, $scope, $compile) {
    $http.get('json/form-padrao.json').then(
            function (response) {
                perguntaAtual = 0;
                jsonList = [];
                jsonList = response.data.perguntas;

                if (perguntaAtual == 0) {
                    if (!jsonList[0].temResposta) {
                        angular.element(document.getElementById('form_2')).append($compile(jsonList[0].html)($scope));
                    }
                }

                $scope.next = function () {
                    if (perguntaAtual >= jsonList.length - 1) {

                        respostaEmail = respostaEmail + "<br>" + "<strong>" + jsonList[perguntaAtual].pergunta + "</strong>";
                        var inputs = jsonList[perguntaAtual].respostas;
                        var resposta;

                        for (var i = 0; i < inputs.length; i++) {
                            var id = "#" + inputs;
                            resposta = $(id).val();
                            respostaEmail = respostaEmail + "<br>" + resposta + "</br>";
                        }

                        $("#right-panel").fadeIn();
                        $("#right-panel").html(respostaEmail);

                        perguntaAtual += 1;

                        angular.element(document.getElementById('form_2')).empty();

                        getFormProduct($http, $scope, $compile, produtoSelecionado);
                    } else {

                        Next(jsonList, $scope, $compile);
                    }

                };

            });
}

function getScope(ctrlName) {
    var sel = 'div[ng-controller="' + ctrlName + '"]';
    return angular.element(sel).scope();
}

function preparaPerguntaFormPadrao(listaDePerguntas) {

    var x;
    var firstQuestion = 0;

    for (x = 0; x < listaDePerguntas.length; x++) {
        // .html);
        if (listaDePerguntas[x].temResposta) {

            var respostas = listaDePerguntas[x].respostas;

            for (var y = 0; y < respostas.length; y++) {

                //respostas[y]);
            }
        }
    }
}
