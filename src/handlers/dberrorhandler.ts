import { Context, Middleware } from "grammy";

export const dbErrorHandler: Middleware<Context> = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // Handle database connection errors here
    console.error("An error occurred:", error);
    await ctx.reply("Sorry, an error occurred while processing your request.");
  }
};

// Error handler for knex().insert() function
export async function handleInsertError(ctx: Context, error: Error) {
  console.error("Error inserting data into database:", error);
  await ctx.reply("Sorry, an error occurred while inserting data into the database.");
}
