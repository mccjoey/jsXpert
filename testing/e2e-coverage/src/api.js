const http = require("http");
const { once } = require("events");
const DEFAULT_USER = {
  username: "Jose",
  password: "123",
};

const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },
  "/login:post": async (request, response) => {
    const user = JSON.parse(await once(request, "data"));
    if (user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
      response.writeHead(401);
      return response.end("Log in Failed");
    }
    return response.end("Log in suceeded");
  },
  default(request, response) {
    response.writeHead(404);
    return response.end("Not found!");
  },
};

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http.createServer(handler).listen(3000, () => {
  console.log("Running at 3000");
});

module.exports = app;
