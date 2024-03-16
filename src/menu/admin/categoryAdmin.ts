import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { getAllCategories } from "../../db/categoriesTable";
import { editBookMsg } from "./bookmenuadmin";
import { firstMenuText } from "../../conversations/adminLogin";
import { getBooksOnThisCategory } from "../../db/booksTable";

export let menuCategoryAdmin = new Menu<MyContext>("menu-category-admin");
export let menuCatAdminText = "";
export let booksOnCategory: any;
export let currentCategoryId: number;



menuCategoryAdmin
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();
    const categories = await getAllCategories();
    for (let i of categories) {
      range
        .submenu(`${i.category_name}`, "books", async function (ctx) {
          currentCategoryId = i.id;
          booksOnCategory = await getBooksOnThisCategory(currentCategoryId);
          
          console.log(booksOnCategory)
          menuCatAdminText = `${i.category_name} janridagi asarlar: `;

          editBookMsg(ctx, menuCatAdminText);
        })

        .row();
    }
    return range;
  })
  .text("Yangini qo'shish ➕", async (ctx) => {
    await ctx.conversation.enter("newCategory");
  })
  .back("Orqaga 🔙", (ctx) => editBookMsg(ctx, firstMenuText));
