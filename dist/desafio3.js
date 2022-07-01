"use strict";
let botaoAtualizar = document.getElementById('atualizar-saldo');
let botaoLimpar = document.getElementById('limpar-saldo');
let soma = document.getElementById('soma');
let campoSaldo = document.getElementById('campo-saldo');
let saldoTotal = 0;
limparSaldo();
function somarAoSaldo(soma) {
    if (campoSaldo) {
        saldoTotal += soma;
        campoSaldo.innerHTML = saldoTotal.toString();
    }
}
function limparCampoSoma() {
    soma.value = "";
}
function limparSaldo() {
    saldoTotal = 0;
    somarAoSaldo(saldoTotal);
}
botaoLimpar.addEventListener('click', function () {
    limparSaldo();
    limparCampoSoma();
});
if (botaoAtualizar) {
    botaoAtualizar.addEventListener("click", () => {
        somarAoSaldo(Number(soma.value));
        limparCampoSoma();
    });
}
