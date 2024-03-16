import { Menu } from "@grammyjs/menu";
import { deleteBook } from "../../db/booksTable";
import { currentBookDesc, currentBookName, currentBookPrice, editBookMsg } from "./bookmenuadmin";
import { MyContext } from "../../types/context";
import { actionMenuText1 } from "./actions";

export let updateBookText = ``;

export const bookActions = new Menu<MyContext>("book-action")

  .submenu(`O'zgartirish`, "update-action", async (ctx) => {
    updateBookText = `Kitob nomi:${currentBookName}, Narhi: ${currentBookPrice}, Qisqacha ma'lumot: ${currentBookDesc} `;
    await editBookMsg(ctx, updateBookText);
  })

  .text(`O'chirish`, async (ctx) => {
    await deleteBook(currentBookName);
    await ctx.reply(`O'chirildi!`);
  })
  .back("Orqaga", async (ctx) => {
    await editBookMsg(ctx, actionMenuText1);
  });
