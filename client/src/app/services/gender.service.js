const serverUrl = "http://localhost:3000";
const endPoint = "/gender/";
const urlApi = serverUrl + endPoint;

// GET ALL
export async function getGenders() {
  const response = await fetch(urlApi, {
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());
  return response;
}

// GET BY ID
export async function getGenderById(id) {
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
export async function postGender(data) {
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
export async function updateGender(id, data) {
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
export async function deleteGender(id) {
  const _urlApi = urlApi + id;
  const response = await fetch(_urlApi, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());

  return response;
}
