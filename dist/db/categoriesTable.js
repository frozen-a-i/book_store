"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategory = exports.getAllCategories = void 0;
const database_1 = require("../database");
async function getAllCategories() {
    return await (0, database_1.knex)('category').select('id', 'category_name');
}
exports.getAllCategories = getAllCategories;
async function getCategory(id) {
    return await (0, database_1.knex)("category").select("*").where({ id });
}
exports.getCategory = getCategory;
async function createCategory(name) {
    return await (0, database_1.knex)('category').insert({
        category_name: name
    });
}
exports.createCategory = createCategory;
