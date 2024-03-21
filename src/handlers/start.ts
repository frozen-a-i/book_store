import { Composer } from "grammy";
import { MyContext } from "../types/context";
import { createUser, getUser } from "../db/userTable";
import { getAdmin } from "../db/admintable";
import { admins } from "../conversations/admin/adminLogin";

export const composer = new Composer<MyContext>();

composer.command("start", async (ctx) => {
  const userObj = await getUser(ctx.from?.id);
  const adminObj = await getAdmin(ctx.from?.username);
  console.log(adminObj);
  if (adminObj.length > 0) await admins(ctx);
  else {
    if (!userObj) createUser(ctx);
    await ctx.conversation.enter("login");
  }
});
composer.hears("message", async (ctx) => {
  if (ctx.message?.contact) {
    const phoneNumber = ctx.message.contact.phone_number;
    await ctx.reply(`Thank you for sharing your phone number: ${phoneNumber}`);
    console.log(phoneNumber);
  }
});

export { composer as startHandler };
