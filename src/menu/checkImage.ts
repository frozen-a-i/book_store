import { Menu } from "@grammyjs/menu";
import { MyContext } from "../types/context";

export const checkImage = new Menu<MyContext>('check').text(`To'lov haqidagi chekni yuborish`, (ctx) => {
    ctx.deleteMessage();
    const file = ctx.msg?.photo

})