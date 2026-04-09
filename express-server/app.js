const express = require('express');
const cors = require('cors'); // No olvides instalarlo: npm install cors
const app = express();
const port = 3000;

// Middleware
app.use(cors());          // Permite que Angular (puerto 4200) se conecte
app.use(express.json());  // Permite que tu servidor entienda el JSON que envía Angular

// Base de datos temporal (en memoria)
let destinos = [
    { nombre: 'Arequipa', imagenUrl: 'https://placehold.co/380x230' },
    { nombre: 'Cusco', imagenUrl: 'https://placehold.co/380x230' }
];

// RUTAS
// 1. Obtener todos los destinos
app.get('/api/destinos', (req, res) => {
    res.json(destinos);
});

// 2. Guardar un nuevo destino
app.post('/api/destinos', (req, res) => {
    console.log("Cuerpo recibido:", req.body); // Verifica esto en tu terminal
    const nuevo = req.body;
    destinos.push(nuevo);
    res.status(201).json(nuevo);
});

app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});