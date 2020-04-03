// Import things (Libraries)
const express = require("express");
const bodyparser = require("body-parser");
// Import DB
const { pokemon } = require("./pokedex.json");

// Instancia de la clase express
const app = express();

// Metodos y componentes que utiliza la aplicación de Bodyparser.
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// POST
// POST usa un body que es un atributo de la petición.
app.post("/pokemon/", (req, res, next) => {
    return res.status(200).send("Estas en pokemon POST, este es el id:" + req.body.name);
});

//Ruta default
app.get("/", (req, res, next) => {
    //   const pokemon = pokedex.pokemon;
    return res.status(200).send("Bienvenido al Pokedex");
});
// Consulta por ID
app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 0 && id <= 150) {
        return res.status(200).send(pokemon[id]);
    }
    return res.status(404).send("Pokemon no encontrado");
});

// Ruta de pokemon
app.get("/pokemon", (req, res, next) => {
    return res.status(200).send(pokemon);
});

// Consulta por nombre.
app.get("/pokemon/:name([A-Za-z]+)", (req, res, next) => {
    const name = req.params.name;
    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });
    if (pk.length > 0) {
        res.status(200).send(pk);
    }
    return res.status(404).send("Pokemon no encontrado");
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
