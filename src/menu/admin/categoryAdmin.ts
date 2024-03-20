import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { getAllCategories } from "../../db/categoriesTable";
import { editBookMsg } from "./bookmenuadmin";
import { firstMenuText } from "../../constants";


export let menuCategoryAdmin = new Menu<MyContext>("menu-category-admin");



menuCategoryAdmin
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();
    const categories = await getAllCategories();
    for (let i of categories) {
      range
        .submenu(`${i.category_name}`, "books", async function (ctx) {
          ctx.session.admin.currentCategoryId = i.id;

          ctx.session.admin.menuCatAdminText = `${i.category_name} janridagi asarlar: `;

          editBookMsg(ctx, ctx.session.admin.menuCatAdminText);
        })

        .row();
    }
    return range;
  })
  .text("Yangini qo'shish ➕", async (ctx) => {
    await ctx.conversation.enter("newCategory");
  })
  .back("Orqaga 🔙", (ctx) => editBookMsg(ctx, firstMenuText));
