// Import things (Libraries)
const express = require("express");
// Import DB
const { pokemon } = require("./pokedex.json");
// Instancia de la clase express
const app = express();

//Ruta default
app.get("/", (req, res, next) => {
  //   const pokemon = pokedex.pokemon;
  res.send("Bienvenido al Pokedex");
});

// Ruta de pokemon
app.get("/pokemon", (req, res, next) => {
  res.status(200);
  res.send(pokemon);
});

// Consulta por ID
app.get("/pokemon/:id", (req, res, next) => {
  res.status(200);
  res.send(pokemon[req.params.id - 1]);
});

// ******* Ejemplos *******
// Ruta con nombre
app.get("/:name", (req, res, next) => {
  console.log(req.params.name);
  res.status(200);
  res.send("Hola " + req.params.name);
});

// process.env.PORT => Define the default port to run and if it isn´t available uses the port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
