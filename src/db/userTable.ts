import { knex } from "../database";
import { MyContext } from "../types/context";

export async function getUser(tg_id: number | undefined) {
  return await knex("user").select("*").where({ id: tg_id }).first();
}
export async function getPhone(tg_id: number | undefined) {
  return await knex("user")
    .select("orders.phone_number")
    .join("orders", { "orders.user_id": "user.id" })
    .where({ "user_id": tg_id })
    .first();
}

export async function createUser(ctx: MyContext) {
  return await knex("user").insert({
    id: ctx.from?.id,
    tg_name: ctx.from?.first_name,
    tg_username: ctx.from?.username,
  });
}
