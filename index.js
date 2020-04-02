// Import things (Libraries)
const express = require("express");
// Import DB
const { pokemon } = require("./pokedex.json");
// Instancia de la clase express
const app = express();

//Ruta default
app.get("/", (req, res, next) => {
  res.status(200);
  //   const pokemon = pokedex.pokemon;
  res.send("Bienvenido al Pokedex");
});

// Consulta por ID
app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) => {
  const id = req.params.id - 1;
  if (id >= 0 && id <= 150) {
    res.status(200);
    return res.send(pokemon[id]);
  }
  res.status(404);
  res.send("Pokemon no encontrado");
});

// Consulta por nombre.
app.get("/pokemon/:name", (req, res, next) => {
  const name = req.params.name;
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name == name) {
      res.status(200);
      res.send(pokemon[i]);
    }
  }
  res.status(404);
  res.send("Pokemon no encontrado");
});

// Ruta de pokemon
app.get("/pokemon/all", (req, res, next) => {
  res.status(200);
  res.send(pokemon);
});

// process.env.PORT => Define the default port to run and if it isn´t available uses the port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

// ******* Ejemplos *******
// Ruta con nombre
// app.get("/:name", (req, res, next) => {
//   console.log(req.params.name);
//   res.status(200);
//   res.send("Hola " + req.params.name);
// });
