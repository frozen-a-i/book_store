import { getAllAdmin } from "../db/admintable";
import { MyContext } from "../types/context";
import axios from "axios";
const apiUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

export async function sendToAdmin(ctx: MyContext, messagetext: string) {
  const admins = await getAllAdmin();

  admins.map(async (element: any) => {
    if (element) {
      const payload = {
        chat_id: element.tg_id,
        text: messagetext,
      };
      console.log(element.tg_id);
      axios
        .post(apiUrl, payload)
        .then((response) => {
          console.log("Message sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending message:", error.message);
        });
    }
  });
}
