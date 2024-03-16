import { MyContext } from "../types/context";
import { deleteMessage } from "../conversations/newBook";

export async function replyWithTimer(
  ctx: MyContext,
  message: string,
  delay: number
) {
  // Send the initial message
  const sentMessage = await ctx.reply(message);

  setTimeout(async () => {
    try {
      // Delete the message
      await deleteMessage(ctx, sentMessage.message_id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  }, delay);
}
