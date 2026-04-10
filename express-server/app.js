const express = require('express');
const cors = require('cors'); // No olvides instalarlo: npm install cors
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
// Middleware
app.use(cors());          // Permite que Angular (puerto 4200) se conecte
app.use(express.json());  // Permite que tu servidor entienda el JSON que envía Angular

const destinosPath = path.join(__dirname, 'db', 'destinos.json');
// RUTAS
// 1. Obtener todos los destinos
app.get('/api/destinos', (req, res) => {
    try {
        const dbPath = path.join(__dirname, 'db', 'destinos.json');
        const data = fs.readFileSync(dbPath, 'utf8');
        const db = JSON.parse(data);
        // Enviamos el array directamente
        res.json(db);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "No se pudo leer el archivo" });
    }
});
app.get('/api/paises', (req, res) => {
    try {
        const dbPath = path.join(__dirname, 'db', 'paises.json');
        const data = fs.readFileSync(dbPath, 'utf8');

        // JSON.parse convertirá "[ 'India', 'China' ]" en un array real de JS
        const db = JSON.parse(data);

        // Enviamos el array directamente
        res.json(db);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "No se pudo leer el archivo" });
    }
});
// 2. Guardar un nuevo destino
app.post('/api/destinos', (req, res) => {
    console.log("Cuerpo recibido:", req.body); // Verifica esto en tu terminal
    try {
        // 1. Leer el contenido actual del archivo
        const data = fs.readFileSync(destinosPath, 'utf8');
        const listaDestinos = JSON.parse(data);
        // 2. Obtener el nuevo destino del body y agregarlo
        const nuevo = req.body;
        // Opcional: Asegurarnos de que el nuevo destino tenga 0 votos por defecto
        if (nuevo.votos === undefined) {
            nuevo.votos = 0;
        }
        listaDestinos.push(nuevo);
        // 3. Escribir la lista actualizada de vuelta al archivo
        // El 'null, 2' sirve para que el JSON quede bonito y legible (identado)
        fs.writeFileSync(destinosPath, JSON.stringify(listaDestinos, null, 2));
        console.log("Nuevo destino guardado en JSON:", nuevo.nombre);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error("Error al guardar en destinos.json:", error);
        res.status(500).json({ error: "No se pudo guardar el destino" });
    }
});
app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});

// Ruta para eliminar un destino por nombre
app.delete('/api/destinos/:nombre', (req, res) => {
    const nombreAEliminar = req.params.nombre;
    try {
        // 1. Leer los datos actuales del archivo
        const data = fs.readFileSync(destinosPath, 'utf8');
        let listaDestinos = JSON.parse(data);
        // 2. Comprobar si existe antes de filtrar (opcional, para mejor feedback)
        const existe = listaDestinos.some(d => d.nombre === nombreAEliminar);
        if (existe) {
            // 3. Filtrar la lista para quitar el que coincida
            listaDestinos = listaDestinos.filter(d => d.nombre !== nombreAEliminar);
            // 4. Guardar la nueva lista en el archivo
            fs.writeFileSync(destinosPath, JSON.stringify(listaDestinos, null, 2));
            console.log(`Destino "${nombreAEliminar}" eliminado del archivo JSON.`);
            res.status(200).json({ message: 'Eliminado con éxito', nombre: nombreAEliminar });
        } else {
            res.status(404).json({ message: 'Destino no encontrado en el archivo' });
        }
    }
    catch (error) {
        console.error("Error al eliminar en destinos.json:", error);
        res.status(500).json({ error: "No se pudo eliminar el destino" });
    }
});

// express-server/app.js

app.patch('/api/destinos/:nombre', (req, res) => {
    const nombreAActualizar = req.params.nombre;
    const { votos } = req.body; // Recibimos el nuevo valor de votos desde el body;
    try {
        // 1. Leer el contenido actual del archivo
        const data = fs.readFileSync(destinosPath, 'utf8');
        const listaDestinos = JSON.parse(data);
        // 2. Comprobar si existe antes de filtrar (opcional, para mejor feedback)
        const destino = listaDestinos.find(d => d.nombre === nombreAActualizar);
        if (destino) {
            destino.votos = votos; // Actualizamos el valor
            // 3. Escribir la lista actualizada de vuelta al archivo
            // El 'null, 2' sirve para que el JSON quede bonito y legible (identado)
            fs.writeFileSync(destinosPath, JSON.stringify(listaDestinos, null, 2));
            console.log(`Votos actualizados para ${nombreAActualizar}: ${votos}`);
            res.json(destino);
        } else {
            res.status(404).json({ message: 'Destino no encontrado' });
        }
    }
    catch (error) {
        console.error("Error al actualizar los votos en destinos.json:", error);
        res.status(500).json({ error: "No se pudo actyalizar el destino" });
    }
});