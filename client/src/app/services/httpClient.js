// const API = "https://api.themoviedb.org/3/discover/movie";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzUzN2ZmMTlmMzgxZGQ3YjY3ZWVlMWVhOGI4MTY0YSIsInN1YiI6IjVlM2ExNmU1MGMyNzEwMDAxODc1NTI4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOpZ_nBtA93tbzr6-rxD0760tssAAaSppyjRv9anArs";
const server = "https://api.themoviedb.org/";
const v = "3"; // version api

// TEST
// const API = "https://api.themoviedb.org/3/discover/movie";
export async function getMovies(path) {
  const url_api = server + v + path;

  const response = await fetch(url_api, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());

  return response;
}

// TEST

const serverUrl = "http://localhost:3000";
export async function getLocalMovies(path) {
  const urlApi = serverUrl + path;
  const response = await fetch(urlApi, {
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());

  return response;
}

// Cuando son miles de datos se retorna un paginado y si el usuario necesita mas datos se realiza otra peticion

//
//

/*
// Ejemplo implementando el metodo POST:

async function postData(url = '', data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
});

*/
