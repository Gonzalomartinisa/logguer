const log4js = require('log4js');

log4js.configure({
    appenders:{
        myLogguerConsole: {type: 'console'},
        myLogguerFile: {type: "file", filename: 'warn.log'},
        myLogguerFile2: {type: "file", filename: 'error.log'},
    },
    categories: {
        default:{appenders: ['myLogguerConsole', 'myLogguerFile'], level: 'trace'},
        console:{appenders: ['myLogguerConsole'], level: 'info'},
        archivo:{appenders: ['myLogguerFile'], level: 'warn'},
        archivo2:{appenders: ['myLogguerFile2'], level: 'error'},
        prod: {appenders: ['myLogguerConsole'], level: 'info'},
    }
});

const logguer = log4js.getLogger('console');
const logguerWarn = log4js.getLogger('archivo');

module.exports = logguer;