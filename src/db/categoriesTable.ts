import { knex } from "../database";

export async function getAllCategories() {
    return await knex('category').select('id', 'category_name');
}
export async function getCategory(id: number) {
    return await knex("category").select("*").where({ id });
}
export async function createCategory(name: string) {
    return await knex('category').insert({
        category_name: name
    })
}
