import { rest } from "msw";

const users = { jimmyfargo: "password" };

export const handlers = [
  rest.get("/test", (_, res, ctx) => {
    return res(ctx.json({ hello: "world" }));
  }),

  rest.post("/test", (req, res, ctx) => {
    const { username, password } = req.body;

    if (password === users[username]) {
      return res(ctx.json({ welcome: "here" }));
    } else {
      return res(
        ctx.status(404),
        ctx.json({ error: true, msg: "username or password invalid" })
      );
    }
  }),
];
