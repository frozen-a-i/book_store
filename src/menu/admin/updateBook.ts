import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { editBookMsg } from "./bookmenuadmin";

export const updateBook = new Menu<MyContext>("update-action")

  .text("💲Narxi", async (ctx) => {
    await ctx.conversation.enter("updateBookPrice");
  })
  .row()
  .submenu("📝Janri", "category-update")
  .row()
  .text("📄Qisqacha ma'lumoti", async (ctx) => {
    await ctx.conversation.enter("updateBookDescription");
  })
  .row()
  .submenu("✅Saqlash", "books", async (ctx) => {
    await editBookMsg(ctx, ctx.session.admin.menuCatAdminText);
  });
