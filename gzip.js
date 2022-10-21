const express = require('express');
const compression = require('compression');
const logguer = require('./logguer.js');
const app = express();
const PORT = parseInt(process.argv[2]) || 8080;

// Comprimir todas las respuestas HTTP
app.use(compression());

app.get('/api/', (req, res) => {
    const resultado =  {};
    for (let i = 0; i < 1000000; i++) {
        const numero = Math.floor(Math.random() * 1000000 + 1);
        if (numero in resultado) resultado[numero]++;
        else resultado[numero] = 1;
    }
        res.json({resultado});
});

app.listen(PORT, err =>{
    if(err) logguerWarn.warn('holaaaaaaaaaaaaaa'); 
    logguer.info(`Server express ${PORT} - PID ${process.pid}`);
});

