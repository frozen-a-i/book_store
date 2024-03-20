import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";

import { actionMenuText1 } from "../../constants";
import { getBooksOnThisCategory } from "../../db/booksTable";

export let bookMenuAdmin = new Menu<MyContext>("books");

bookMenuAdmin
  .dynamic(async (ctx) => {
    const range = new MenuRange<MyContext>();
    const categoryBooks = await getBooksOnThisCategory(
      ctx.session.admin.currentCategoryId
    );
    for (let i of categoryBooks) {
      range
        .submenu(`${i.book_name}`, "book-action", async (ctx) => {
          ctx.session.admin.currentBookName = i.book_name;
          ctx.session.admin.currentBookPrice = i.price;
          ctx.session.admin.currentBookDesc = i.description;
          ctx.session.admin.currentBookCategory =
            ctx.session.admin.currentCategoryName;
          ctx.session.admin.updateBookText = `Kitob nomi:${ctx.session.admin.currentBookName}, Narhi: ${ctx.session.admin.currentBookPrice}, Janri: ${ctx.session.admin.currentBookCategory}Qisqacha ma'lumot: ${ctx.session.admin.currentBookDesc} `;

          await editBookMsg(ctx, ctx.session.admin.currentBookName);
        })
        .row();
    }
    return range;
  })
  .text("Yangini qo'shish ➕", async (ctx) => {
    await ctx.conversation.enter("newBook");
  })
  .back("Orqaga", async (ctx) => {
    await editBookMsg(ctx, actionMenuText1);
  });

export async function editBookMsg(ctx: MyContext, text: string) {
  await ctx.editMessageText(text);
}
