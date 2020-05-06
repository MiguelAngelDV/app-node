// Import things (Libraries)
const express = require("express");
const morgan = require("morgan");

// Funciones importadas del archivo
const pokemon = require("./routes/pokemon");
const user = require("./routes/user");

// Instancia de la clase express
const app = express();

// Middleware de Morgan
app.use(morgan("dev"));

//Body Parser de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Metodos y componentes que utiliza la aplicación de Bodyparser.
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));

//Ruta default
app.get("/", (req, res, next) => {
  //   const pokemon = pokedex.pokemon;
  return res.status(200).json({ code: 1, message: "Bienvenido al Pokedex" });
});

// Delegamos que archivos y funciones se encargaran de procesar las rutas.
app.use("/pokemon", pokemon);
app.use("/user", user);

// Codigo de error.
app.use((req, res, next) => {
  return res.status(404).json({ code: 404, message: "URL No ENCONTRADO" });
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
