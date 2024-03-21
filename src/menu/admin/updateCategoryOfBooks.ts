import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { getAllCategories } from "../../db/categoriesTable";
import { updatingBook } from "../../db/booksTable";

import { replyWithTimer } from "../../handlers/replyTimer";

export let categoryUpdate = new Menu<MyContext>("category-update");

categoryUpdate
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();
    const categories = await getAllCategories();
    for (let i of categories) {
      range
        .text(`${i.category_name}`, async (ctx) => {
          await updatingBook(
            ctx.session.admin.currentBookName,
            undefined,
            undefined,
            i.id
          );
          ctx.session.admin.currentBookCategory=i.category_name;
          await replyWithTimer(
            ctx,
            `Janr muvaffaqiyatli o'zgartirildi!☺️`,
            1000
          );
        })
        .row();
    }
    return range;
  })
  .back(
    "Ortga"
  );
