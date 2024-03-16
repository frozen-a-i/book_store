import { Menu, MenuRange } from "@grammyjs/menu";
import { books, categoryNameText } from "./category";
import { MyContext } from "../types/context";
import { editBookMsg } from "./admin/bookmenuadmin";

export let bookMenu = new Menu<MyContext>("book");
bookMenu
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();
    for (let i of await books) {
      range
        .submenu(`${i.book_name}`,'make-order', (ctx) => {
          ctx.reply(
            `Kitob nomi:${i.book_name}, Narhi: ${i.price}, 
             Qisqacha ma'lumot: ${i.description} `,
          
          );
        })

        .row();
    }
    return range;
  })
  .back("Orqaga 🔙", (ctx) => editBookMsg(ctx, categoryNameText));
