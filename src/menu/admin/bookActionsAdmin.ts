import { Menu } from "@grammyjs/menu";
import { deleteBook } from "../../db/booksTable";
import { editBookMsg } from "./bookmenuadmin";
import { MyContext } from "../../types/context";
import { replyWithTimer } from "../../handlers/replyTimer";

export const bookActions = new Menu<MyContext>("book-action")

  .submenu(`⚙️O'zgartirish`, "update-action", async (ctx) => {
    await editBookMsg(ctx, ctx.session.admin.updateBookText);
  })

  .text(`❌O'chirish`, async (ctx) => {
    await deleteBook(ctx.session.admin.currentBookName);
    await replyWithTimer(ctx, `O'chirildi!✅`, 1000);
  })
  .row()
  .back("Orqaga🔙", async (ctx) => {
    await editBookMsg(ctx, ctx.session.admin.menuCatAdminText);
  });
