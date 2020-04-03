// Import DB
const { pk } = require("../pokedex.json");
const express = require("express");
const pokemon = express.Router();

// POST
// POST usa un body que es un atributo de la petición.
pokemon.post("/", (req, res, next) => {
  return res.status(200).send("Estas en pokemon POST");
});

// GET

// Ruta de pokemon
pokemon.get("/", (req, res, next) => {
  console.log(pk);
  return res.status(200).send("Esta es la DB: " + pk);
});

// Consulta por ID
pokemon.get("/:id([0-9]{1,3})", (req, res, next) => {
  const id = req.params.id - 1;
  if (id >= 0 && id <= 150) {
    return res.status(200).send(pk[id]);
  }
  return res.status(404).send("Pokemon no encontrado");
});

// Consulta por nombre.
pokemon.get("/:name([A-Za-z]+)", (req, res, next) => {
  const name = req.params.name;
  const pkmn = pk.filter(p => {
    return p.name.toUpperCase() == name.toUpperCase() && p;
  });
  if (pkmn.length > 0) {
    res.status(200).send(pkmn);
  }
  return res.status(404).send("Pokemon no encontrado");
});

// Exportamos las funciones de nuestro archivo
module.exports = pokemon;
