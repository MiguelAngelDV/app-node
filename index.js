// Import things (Libraries)
const express = require("express");
const bodyparser = require("body-parser");
const pokemon = require("./routes/pokemon");

// Instancia de la clase express
const app = express();

// Metodos y componentes que utiliza la aplicación de Bodyparser.
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Ruta default
app.get("/", (req, res, next) => {
  //   const pokemon = pokedex.pokemon;
  return res.status(200).send("Bienvenido al Pokedex");
});

// Delegamos que archivos y funciones se encargaran de procesar las rutas.
app.use("/pokemon", pokemon);

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
