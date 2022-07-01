"use strict";
var Profissao;
(function (Profissao) {
    Profissao[Profissao["Atriz"] = 0] = "Atriz";
    Profissao[Profissao["Padeiro"] = 1] = "Padeiro";
})(Profissao || (Profissao = {}));
let arr = [];
let pessoa1 = {
    nome: "maria",
    idade: 29,
    profissao: Profissao.Atriz
};
let pessoa2 = {
    nome: "roberto",
    idade: 19,
    profissao: Profissao.Padeiro
};
let pessoa3 = {
    nome: "laura",
    idade: 32,
    profissao: Profissao.Atriz
};
let pessoa4 = {
    nome: "carlos",
    idade: 19,
    profissao: Profissao.Padeiro
};
arr.push(pessoa1);
arr.push(pessoa2);
arr.push(pessoa3);
arr.push(pessoa4);
document.getElementsByClassName("resposta2")[0].innerHTML = JSON.stringify(arr);
//OU
console.log(arr);
