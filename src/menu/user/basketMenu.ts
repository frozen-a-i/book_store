import { Menu } from "@grammyjs/menu";
import { MyContext } from "../../types/context";
import { editBookMsg } from "../admin/bookmenuadmin";
import { firstUserText } from "../../constants";
import { replyWithTimer } from "../../handlers/replyTimer";

export let basketMenu = new Menu<MyContext>("basket-menu")
  .text(`Buyurtma berish 🚀`, async (ctx) => {
    await ctx.conversation.enter("gettingPhone");
  })

  .submenu(`Savatni tozalash`, "menu-category", (ctx) => {
    editBookMsg(ctx, firstUserText);
    ctx.session.user.currentBookCount = [];
    ctx.session.user.currentBookCountIndex = 0;
    ctx.session.user.selectedBooks = [];
    ctx.session.user.orderAmount = 0;
    ctx.session.user.orderBookIds=[];
    replyWithTimer(ctx, `Savat tozalandi!`, 500);
  })
  .row()
  .back("Ortga🔙", (ctx) => editBookMsg(ctx, firstUserText));
