import { Menu, MenuRange } from "@grammyjs/menu";

import { getAllCategories } from "../../db/categoriesTable";
import { editBookMsg } from "../admin/bookmenuadmin";
import { MyContext } from "../../types/context";


export let menuCategory = new Menu<MyContext>("menu-category");


menuCategory.dynamic(async () => {
  const range = new MenuRange<MyContext>();
  const categories = await getAllCategories();
  for (let i of categories) {
    range
      .submenu(`${i.category_name}`, "book", async (ctx) => {
        ctx.session.user.currentCategoryId= i.id;
        ctx.session.user.currentCategoryName=i.category_name
 
        await editBookMsg(ctx, `${i.category_name} janridagi asarlariii: `);
      })
      .row();
  }
  return range;
});
