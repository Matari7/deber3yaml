const express = require('express');
const bodyParser = require('body-parser');
const yaml = require('js-yaml');
const app = express();
const port = 3000;

// Middleware para parsear YAML
app.use(bodyParser.text({ type: 'application/x-yaml' }));

// Ruta para obtener datos en formato YAML
app.get('/api/data', (req, res) => {
    const data = {
        message: 'Hola desde el servidor!',
        data: ['juan', 2, 3, 4, 5]
    };
    const yamlData = yaml.dump(data);
    res.type('application/x-yaml');
    res.send(yamlData);
});

// Ruta para recibir datos en formato YAML
app.post('/api/data', (req, res) => {
    try {
        const receivedData = yaml.load(req.body);
        console.log(receivedData);
        const username = receivedData.user.username;
        const email = receivedData.user.email;
        const response = { message: `Datos recibidos correctamente, ${username}!, ${email}` };
        const yamlResponse = yaml.dump(response);
        res.type('application/x-yaml');
        res.send(yamlResponse);
    } catch (e) {
        res.status(400).send('Error al parsear YAML');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
