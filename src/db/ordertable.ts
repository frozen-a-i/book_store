import { knex } from "../database";

export async function createOrders(
  user_id: number,
  status: string,
  order_date: Date,
  phone_number: string,
  total_amount: number
) {
  return await knex("orders").insert({
    user_id,
    status,
    order_date,
    phone_number,
    total_amount,
  });
}

export async function currentOrderId(user_id: number) {
  const lastOrder = await knex("orders")
    .select("id")
    .where({ user_id })
    .orderBy("id", "desc")
    .limit(1);
  return lastOrder;
}
export async function createOrderItem(
  user_id: number,
  book_id: number,
  quantity: number
) {
  const orderId = (await currentOrderId(user_id))[0].id;

  return await knex("order_item").insert({
    order_id: orderId,
    book_id,
    quantity,
  });
}

export async function getAllOrders() {
  return await knex("orders")
    .select(
      "orders.id",
      "orders.status",
      "orders.order_date",
      "orders.phone_number",
      "user.tg_name",
      "orders.total_amount"
    )
    .join("user", { "user.id": "orders.user_id" });
}

export async function changeStatus(id: number) {
  return await knex("orders").where({ id }).update({
    status: "Passiv",
  });
}

export async function getActiveOrders() {
  return await knex("orders")
    .select(
      "orders.id",
      "orders.status",
      "orders.order_date",
      "orders.phone_number",
      "user.tg_name",
      "orders.total_amount"
    )
    .join("user", { "user.id": "orders.user_id" })
    .where({ status: "Aktiv" });
}

export async function getPassiveOrders() {
  return await knex("orders")
    .select(
      "orders.id",
      "orders.status",
      "orders.order_date",
      "orders.phone_number",
      "user.tg_name",
      "orders.total_amount"
    )
    .join("user", { "user.id": "orders.user_id" })
    .where({ status: "Passiv" });
}

export async function getOrderItems(id: number) {
  return await knex("order_item")
    .select("book.book_name", "book.price", "order_item.quantity")
    .join("book", { "book.id": "order_item.book_id" })
    .where("order_id", id);
}
