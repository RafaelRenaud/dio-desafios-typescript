"use strict";
let employee = {
    code: 10,
    name: "John"
};
document.getElementsByClassName("resposta")[0].innerHTML = `Nome da Pessoa: ${employee.name}`;
document.getElementsByClassName("resposta")[1].innerHTML = `Código da Pessoa: ${employee.code}`;
