// Import things (Libraries)
const express = require("express");
const morgan = require("morgan");

// Funciones importadas del archivo
const pokemon = require("./routes/pokemon");
const user = require("./routes/user");
// Middleware
const auth = require("./middleware/auth");
const notFound = require("./middleware/notFound");
const cors = require("./middleware/cors");

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
app.use(cors);
app.use("/user", user);
app.use(auth);
app.use("/pokemon", pokemon);

// Codigo de error.
app.use(notFound);

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
