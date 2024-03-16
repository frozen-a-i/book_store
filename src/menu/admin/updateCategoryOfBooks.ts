import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { getAllCategories } from "../../db/categoriesTable";
import { updatingBook } from "../../db/booksTable";
import { currentBookName, editBookMsg } from "./bookmenuadmin";
import { updateBookText } from "./bookActionsAdmin";
import { replyWithTimer } from "../../handlers/replyTimer";

export let categoryUpdate = new Menu<MyContext>("category-update");

categoryUpdate
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();
    const categories = await getAllCategories();
    for (let i of categories) {
      range
        .text(`${i.category_name}`, async (ctx) => {
          const category_id = i.id;
          await updatingBook(
            currentBookName,
            undefined,
            undefined,
            category_id
          );
          await replyWithTimer(ctx, `Janr muvaffaqiyatli o'zgartirildi!☺️`, 1000);
        })
        .row();
    }
    return range;
  })
  .back("Orqaga🔙", (ctx) => editBookMsg(ctx, updateBookText));
