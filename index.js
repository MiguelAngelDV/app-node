const express = require('express');
// Instancia de la clase express
const app = express();+

//Ruta default
app.get("/", (req,res,next)=>{
    res.send("Bienvenue to the server");
});

// Ruta con nombre
app.get('/:name', (req, res, next) =>{
    console.log(req.params.name);
    res.status(200);
    res.send("Hola "+ req.params.name);
})

// process.env.PORT => Define dthe default port to run and if it isn´t available uses the port 3000
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running on port 3000");
});
    
