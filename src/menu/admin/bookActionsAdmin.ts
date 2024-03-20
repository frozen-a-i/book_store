import { Menu } from "@grammyjs/menu";
import { deleteBook } from "../../db/booksTable";
import { editBookMsg } from "./bookmenuadmin";
import { MyContext } from "../../types/context";
import { actionMenuText1 } from "../../constants";
import { replyWithTimer } from "../../handlers/replyTimer";

export const bookActions = new Menu<MyContext>("book-action")

  .submenu(`O'zgartirish`, "update-action", async (ctx) => {
    ctx.session.admin.updateBookText = `Kitob nomi:${ctx.session.admin.currentBookName}, Narhi: ${ctx.session.admin.currentBookPrice}, Qisqacha ma'lumot: ${ctx.session.admin.currentBookDesc} `;
    const text = ctx.session.admin.updateBookText;
    await editBookMsg(ctx, text);
  })

  .text(`O'chirish`, async (ctx) => {
    await deleteBook(ctx.session.admin.currentBookName);
    await replyWithTimer(ctx, `O'chirildi!`, 1000);
  })
  .back("Orqaga", async (ctx) => {
    await editBookMsg(ctx, actionMenuText1);
  });
