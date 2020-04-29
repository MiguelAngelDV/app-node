const express = require("express");
const pokemon = express.Router();

// Import DB
const db = require("../config/database");
// JSON DB const pk = require("../pokedex").pokemon;

// POST
// POST usa un body que es un atributo de la petición.
pokemon.post("/", async (req, res, next) => {
  // Deconstruccion del body segun sus variables y asignacion  a las mismas
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
  if (pok_name && pok_height && pok_weight && pok_base_experience) {
    let query =
      "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
    query += `VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

    // Enviar la sentencia
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(201)
        .json({ code: 201, message: "Pokemon insertado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Ocurrio un problema" });
  }

  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

// DELETE
pokemon.delete("/:id([0-9]{1,3})", async (req, res, next) => {
  const query = `DELETE FROM pokemon WHERE pok_id = ${req.params.id}`;
  const rows = await db.query(query);

  if (rows.affectedRows == 1) {
    return res
      .status(200)
      .json({ code: 200, message: "Pokemon borrado exitosamente" });
  }
  return res.status(404).json({ code: 404, message: "Pokemon NO encontrado" });
});

// PUT
pokemon.put("/:id([0-9]{1,3})", async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
  let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height = ${pok_height},pok_weight = ${pok_weight},`;
  query += `pok_base_experience = ${pok_base_experience} WHERE pok_id = ${req.params.id}`;

  const rows = await db.query(query);

  if (rows.affectedRows == 1) {
    return res
      .status(200)
      .json({ code: 200, message: "Pokemon actualizado exitosamente" });
  }
  return res.status(404).json({ code: 404, message: "Pokemon NO encontrado" });
});

// ¨PÄTCH
pokemon.patch("/:id([0-9]{1,3})", async (req, res, next) => {
  if (req.body.pok_name) {
    let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id = ${req.params.id}`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: "Pokemon actualizado exitosamente" });
    }
    return res.status(500).json({ code: 500, message: "Ocurrio un error! :(" });
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

// GET
// Ruta de pokemon
pokemon.get("/", async (req, res, next) => {
  const pkmon = await db.query("SELECT * FROM pokemon");
  return res.status(200).json({ code: 1, message: pkmon });
});

// Consulta por ID
pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id - 1;
  const pkmon = await db.query("SELECT * FROM pokemon");
  if (id >= 0 && id <= 722) {
    return res.status(200).send(pkmon[id]);
  }
  return res.status(404).json({ code: 404, message: "Pokemon NO encontrado" });
});

// Consulta por nombre.
pokemon.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  const pkmon = await db.query("SELECT * FROM pokemon");
  const pkmn = pkmon.filter((p) => {
    return p.pok_name.toUpperCase() == name.toUpperCase() && p;
  });
  if (pkmn.length > 0) {
    res.status(200).json({ code: 1, message: pkmn });
  }
  return res.status(404).json({ code: 404, message: "Pokemon NO encontrado" });
});

// Exportamos las funciones de nuestro archivo
module.exports = pokemon;
