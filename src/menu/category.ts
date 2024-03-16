import { Menu, MenuRange } from "@grammyjs/menu";

import { getAllCategories } from "../db/categoriesTable";
import { getBooksOnThisCategory } from "../db/booksTable";
import { editBookMsg } from "./admin/bookmenuadmin";
import { MyContext } from "../types/context";

export let books: any;
export let menuCategory = new Menu<MyContext>("menu-category");
export let categoryNameText: string;

menuCategory.dynamic(async () => {
  const range = new MenuRange<MyContext>();
  const categories = await getAllCategories();
  for (let i of categories) {
    range
      .submenu(`${i.category_name}`, "book", async (ctx) => {
        books = await getBooksOnThisCategory(i.id);

        categoryNameText = i.category_name;
        await editBookMsg(ctx, `${i.category_name} janridagi asarlariii: `);
      })
      .row();
  }
  return range;
});
