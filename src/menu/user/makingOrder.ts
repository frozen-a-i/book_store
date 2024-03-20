import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { replyWithTimer } from "../../handlers/replyTimer";
import { editBookMsg } from "../admin/bookmenuadmin";

export let makeOrder = new Menu<MyContext>("make-order")
  .text("−", (ctx) => {
    if (
      ctx.session.user.currentBookCount[
        ctx.session.user.currentBookCountIndex
      ] > 0
    ) {
      ctx.session.user.currentBookCount[
        ctx.session.user.currentBookCountIndex
      ] -= 1;
    }
    ctx.menu.update();
  })
  .text(
    (ctx) =>
      `${
        ctx.session.user.currentBookCount[
          ctx.session.user.currentBookCountIndex
        ]
      }`
  )
  .text("➕", (ctx) => {
    ctx.session.user.currentBookCount[
      ctx.session.user.currentBookCountIndex
    ] += 1;

    ctx.menu.update();
  })
  .row()
  .text(`Savatga qo'shish`, (ctx) => {
    ctx.session.user.currentBookCountIndex++;
    ctx.session.user.currentBookCount[
      ctx.session.user.currentBookCountIndex
    ] = 0;

    replyWithTimer(ctx, `Savatga qo'shildi!`, 500);
  })
  .row()
  .submenu(`Savatcha🛒`, "basket-menu", async (ctx) => {
    return ctx.editMessageText(await savatchatext(ctx));
  })
  .back("Ortga", (ctx) => editBookMsg(ctx, ctx.session.user.currentBookName));

export async function savatchatext(ctx: MyContext) {
  const text = ctx.session.user.selectedBooks
    .map((element, index) => {
      return `${element} --> ${ctx.session.user.currentBookCount[index]}`;
    })
    .join("\n");
  return text || `Savatda kitoblar mavjud emas🙁`;
}
