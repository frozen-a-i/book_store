import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { editBookMsg } from "../admin/bookmenuadmin";
import { getBooksOnThisCategory } from "../../db/booksTable";

export let bookMenu = new Menu<MyContext>("book");
bookMenu
  .dynamic(async (ctx) => {
    const books = await getBooksOnThisCategory(
      ctx.session.user.currentCategoryId
    );
    const range = new MenuRange<MyContext>();
    for (let i of books) {
      range
        .submenu(`${i.book_name}`, "make-order", async (ctx) => {
          ctx.session.user.currentBookName = i.book_name;
          ctx.session.user.currentBookId = i.id;
          ctx.session.user.selectedBooks.push(ctx.session.user.currentBookName);
          ctx.session.user.currentBookCount[
            ctx.session.user.currentBookCountIndex
          ] = 0;
          await editBookMsg(
            ctx,
            `Kitob nomi:${i.book_name}, Narhi: ${i.price}, 
             Qisqacha ma'lumot: ${i.description} `
          );
        })

        .row();
    }
    return range;
  })
  .back(
    "Orqaga 🔙",
    async (ctx) => await editBookMsg(ctx, ctx.session.user.currentCategoryName)
  );
