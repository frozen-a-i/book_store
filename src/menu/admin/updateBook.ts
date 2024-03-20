import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { editBookMsg } from "./bookmenuadmin";

export const updateBook = new Menu<MyContext>("update-action")

  .text("Narxi", async (ctx) => {
    await ctx.conversation.enter("updateBookPrice");
  })
  .submenu("Janri", "category-update", async (ctx) => {
    // await editBookMsg(ctx, currentBookCategory);
  })
  .text("Qisqacha ma'lumoti", async (ctx) => {
    await ctx.conversation.enter("updateBookDescription");
  })
  .back("Orqaga", async (ctx) => {
    await editBookMsg(ctx, ctx.session.admin.currentBookName);
  });
