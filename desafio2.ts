enum Profissao{
    Atriz,
    Padeiro
}

interface Pessoa{
    nome: string,
    idade: number,
    profissao: Profissao
}

let arr: Pessoa[] = [];

let pessoa1: Pessoa = {
    nome: "maria",
    idade: 29,
    profissao: Profissao.Atriz
};


let pessoa2: Pessoa = {
    nome: "roberto",
    idade: 19,
    profissao: Profissao.Padeiro
}

let pessoa3: Pessoa = {
    nome: "laura",
    idade: 32,
    profissao: Profissao.Atriz
}

let pessoa4: Pessoa = {
    nome: "carlos",
    idade: 19,
    profissao: Profissao.Padeiro
}

arr.push(pessoa1);
arr.push(pessoa2);
arr.push(pessoa3);
arr.push(pessoa4);

document.getElementsByClassName("resposta2")[0].innerHTML = JSON.stringify(arr);
//OU
console.log(arr);