import { Menu } from "@grammyjs/menu";
import { deleteBook } from "../../db/booksTable";
import {
  currentBookDesc,
  currentBookName,
  currentBookPrice,
  editBookMsg,
} from "./bookmenuadmin";
import { MyContext } from "../../types/context";
import { actionMenuText1 } from "./actions";

export let updateBookText = ``;

export const bookActions = new Menu<MyContext>("book-action")

  .submenu(`O'zgartirish`, "update-action", (ctx) => {
    updateBookText = `Kitob nomi:${currentBookName}, Narhi: ${currentBookPrice}, Qisqacha ma'lumot: ${currentBookDesc} `;
    editBookMsg(ctx, updateBookText);
  })

  .text(`O'chirish`, (ctx) => {
    deleteBook(currentBookName);
    ctx.reply(`O'chirildi!`);
  })
  .back("Orqaga", (ctx) => {
    editBookMsg(ctx, actionMenuText1);
  });
