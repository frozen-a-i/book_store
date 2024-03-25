import { Menu, MenuRange } from "@grammyjs/menu";

import { getAllCategories } from "../../db/categoriesTable";
import { editBookMsg } from "../admin/bookmenuadmin";
import { MyContext } from "../../types/context";
import { savatchatext } from "./makingOrder";

export let menuCategory = new Menu<MyContext>("menu-category");

menuCategory
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();
    const categories = await getAllCategories();
    for (let i of categories) {
      range
        .submenu(`${i.category_name}`, "book", async (ctx) => {
          ctx.session.user.currentCategoryId = i.id;
          ctx.session.user.currentCategoryName = i.category_name;

          await editBookMsg(
            ctx,
            `<b>${i.category_name}</b> janridagi asarlar: `
          );
        })
        .row();
    }
    return range;
  })
  .submenu("Savatcha🛒", "basket-menu", async (ctx) => {
    return ctx.editMessageText(await savatchatext(ctx));
  });
