const serverUrl = "http://localhost:3000";
const endPoint = "/movie/";
const urlApi = serverUrl + endPoint;

// GET ALL
export async function getMovies() {
  const response = await fetch(urlApi, {
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());
  return response;
}

// GET BY ID
export async function getMovieById(id) {
  const _urlApi = urlApi + id;
  const response = await fetch(_urlApi, {
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());
  return response;
}

// POST DATA
export async function postMovie(data) {
  const response = await fetch(urlApi, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then((result) => result.json());
  return response;
}

// UPDATE DATA
export async function updateMovie(id, data) {
  const _urlApi = urlApi + id;
  const response = await fetch(_urlApi, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then((result) => result.json());
  return response;
}

// DELETE DATA
export async function deleteMovie(id) {
  const _urlApi = urlApi + id;
  const response = await fetch(_urlApi, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());

  return response;
}

//

//

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
