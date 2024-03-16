import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../types/context";

export let orderMenu = new Menu<MyContext>("orders-menu");
// const orders = getAllOrders();

// orderMenu.dynamic(async () => {
//   const range = new MenuRange<MyContext>();
// // 
//   for (let i of await orders) {
//     range
//       .text(`${i.category_name}`, async function (ctx) {
//         books = await getBook(i.category_name);
//         ctx.deleteMessage();
//         ctx.reply(`${i.category_name} janridagi asarlar: `, {
//           reply_markup: bookMenu,
//         });
//       })
//       .row();
//   }
//   return range;
// });
// function getAllOrders() {
//     throw new Error("Function not implemented.");
// }

