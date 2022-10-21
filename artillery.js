const express = require("express");
const cluster = require('cluster');
const logguer = require('./logguer.js');
const PORT = process.argv[2] || '8080';
const modoCluster = process.argv[3] || 'cluster';

function isPrime(n) {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
    if (n % 2 == 0) return (n == 2);
    var m = Math.sqrt(n);
    for (var i = 3; i <= m; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

if(modoCluster == 'cluster' && cluster.isPrimary) {
    const numCPUs = require('os').cpus().length;
    console.log('Cantidad de CPUS', numCPUs);
    console.log('PID master', process.pid);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();        
    };

    cluster.on('exit', worker =>{
        console.log('Died');
    });

} else {
    const app = express();
    app.get('/', (req, res) =>{
        const primos = [];
        const max = Number(req.query.max) || 1000000;
        for (let i = 1; i < max; i++) {
            if(isPrime(i)) primos.push(i)
        }
        res.json(primos);
    })

    app.listen(PORT, () => {
        console.log('Servidor corriendo en el puerto', PORT, 'pid', process.pid);
        logguer.info(`Server express ${PORT} - PID ${process.pid}`);
    })
}