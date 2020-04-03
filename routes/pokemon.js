const express = require("express");
const pokemon = express.Router();

// Import DB
const db = require("../config/database");
// JSON DB const pk = require("../pokedex").pokemon;

// POST
// POST usa un body que es un atributo de la petición.
pokemon.post("/", (req, res, next) => {
  return res.status(200).send("Estas en pokemon POST");
});

// GET
// Ruta de pokemon
pokemon.get("/", async (req, res, next) => {
  const pkmon = await db.query("SELECT * FROM pokemon");
  return res.status(200).json(pkmon);
});

// Consulta por ID
pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id - 1;
  const pkmon = await db.query("SELECT * FROM pokemon");
  if (id >= 0 && id <= 150) {
    return res.status(200).send(pkmon[id]);
  }
  return res.status(404).send("Pokemon no encontrado");
});

// Consulta por nombre.
pokemon.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  const pkmon = await db.query("SELECT * FROM pokemon");
  const pkmn = pkmon.filter(p => {
    return p.pok_name.toUpperCase() == name.toUpperCase() && p;
  });
  if (pkmn.length > 0) {
    res.status(200).send(pkmn);
  }
  return res.status(404).send("Pokemon no encontrado");
});

// Exportamos las funciones de nuestro archivo
module.exports = pokemon;
