import { getAllAdmin } from "../db/admintable";
import { MyContext } from "../types/context";
import axios from "axios";
const apiUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

export async function sendToAdmin(ctx: MyContext, messagetext: string) {
  const adminss = await getAllAdmin();

  await Promise.all(
    adminss.map(async (element: any) => {
      if (element.tg_id) {
        const payload = {
          chat_id: element.tg_id,
          text: messagetext,
        };
        try {
          await axios.post(apiUrl, payload);
        } catch (error: any) {
          console.error("Error sending message to admin:", error.message);
        }
      }
    })
  );
}
