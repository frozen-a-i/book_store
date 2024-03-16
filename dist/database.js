"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
//connect
exports.knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: "root",
        password: "Anush12345",
        database: "bookstore",
    },
    pool: { min: 0, max: 7 }
});
//check
exports.knex.raw('SELECT VERSION()').then(() => {
    console.log('connection to db successfully');
});
