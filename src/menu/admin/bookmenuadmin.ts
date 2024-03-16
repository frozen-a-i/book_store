import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { booksOnCategory } from "./categoryAdmin";
import { actionMenuText1 } from "./actions";

/// for admins
export let currentBookName: string;
export let currentBookPrice: string;
export let currentBookDesc: string;

export let bookMenuAdmin = new Menu<MyContext>("books");

bookMenuAdmin
  .dynamic(async () => {
    const range = new MenuRange<MyContext>();

    for (let i of booksOnCategory) {
      range
        .submenu(`${i.book_name}`, "book-action", async (ctx) => {
          currentBookName = i.book_name;
          currentBookPrice = i.price;
          currentBookDesc = i.description;

          await editBookMsg(ctx, currentBookName);
        })
        .row();
    }
    return range;
  })
  .text("Yangini qo'shish ➕", async (ctx) => {
    await ctx.conversation.enter("newBook");
  })
  .back("Orqaga", async (ctx) => {
    await editBookMsg(ctx, actionMenuText1);
  });

///// updating currentBookItems /////////

export async function updateCurrentBookItems(itemName: string, newItem: string) {
  switch (itemName) {
    case "currentBookPrice":
      currentBookPrice = newItem;

      break;
    case "currentBookDesc":
      currentBookDesc = newItem;

      break;

    default:
      break;
  }
}

export async function editBookMsg(ctx: MyContext, text: string) {
  await ctx.editMessageText(text);
}
