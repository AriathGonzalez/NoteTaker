// const basePath = "https://localhost:7056/api";
const basePath = "http://localhost:8080/api";

const api = {
  get: (endpoint) => fetch(`${basePath}/${endpoint}`),
  post: (endpoint, body) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    }),
  put: (endpoint, body) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    }),
  delete: (endpoint) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "DELETE",
    }),
};

export { api };
