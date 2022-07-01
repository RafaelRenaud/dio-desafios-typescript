// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

var apiKey: string = '3f301be7381a03ad8d352314dcc3ec1d';
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string = '7101979';

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container');

if(loginButton){
    loginButton.addEventListener('click', async () => {
        await criarRequestToken();
        await logar();
        await criarSessao();
      });
}

if(searchButton){
    searchButton.addEventListener('click', async () => {
        let lista = document.getElementById("lista");
        if (lista) {
          lista.outerHTML = "";
        }
        let query = document.getElementById('search') as HTMLInputElement;
        let listaDeFilmes = await procurarFilme(query.value);
        let ul = document.createElement('ul');
        ul.id = "lista"

        try{
            let jsonList = JSON.parse(JSON.stringify(listaDeFilmes));
            for (const item of jsonList.results) {
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(item.original_title))
                ul.appendChild(li)
            }
        }catch(err){
            console.log("Erro ao listar filmes: " + err);
        }

        if(searchContainer){
            console.log(listaDeFilmes);
            searchContainer.appendChild(ul);
        }
    });
}

function preencherSenha() {
  let senha = document.getElementById('senha') as HTMLInputElement;
  password = senha.value;
  validateLoginButton();
}

function preencherLogin() {
  let user = document.getElementById('login') as HTMLInputElement;
  username =  user.value;
  validateLoginButton();
}

function preencherApi() {
  let appkey = document.getElementById('api-key') as HTMLInputElement;
  apiKey = appkey.value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

class HttpClient {
  static async get({url = "", method= "", body = {}}) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      if(url && method){
        request.open(method, url, true);
      }

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(body));
      }
    })
  }
}

async function procurarFilme(query: string) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  });
  return result;
}

async function adicionarFilme(filmeId: string) {
if(filmeId){
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
      });

    console.log(result);

}
}

async function criarRequestToken () {
  let result: any = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  });
  
  requestToken = result.request_token;
  console.log("Request Token: "+ requestToken);
}

async function logar() {
    if(username && password && requestToken){
        await HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
            method: "POST",
            body: {
              username: `${username}`,
              password: `${password}`,
              request_token: `${requestToken}`
            }
          });
    }
}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  })

  let responseBody = JSON.parse(JSON.stringify(result));
  sessionId = responseBody.session_id;
}

async function criarLista(nomeDaLista: string, descricao: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId: string, listaId: string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}