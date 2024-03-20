import { knex } from "../database";

export async function getAdmin(username: string | undefined) {
  return await knex("admins").select("*").where({ admin_name: username });
}

export async function getAllAdmin() {
  return await knex("admins").select("*");
}
export async function createAdmin(username?: string | undefined) {
  if (username)
    return await knex("admins").insert({
      admin_name: username,
    });
}
export async function updateAdminId(
  id: number | undefined,
  username: string | undefined
) {
  return await knex("admins")
    .where({
      admin_name: username,
    })
    .update({ tg_id: id });
}
