import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { server, rest } from "../mock";

import Login from "./Login";

function setup() {
  const utils = render(<Login />);
  const username = utils.getByLabelText("username");
  const password = utils.getByLabelText("password");
  const submit = utils.getByLabelText("submit");

  return {
    ...utils,
    username,
    password,
    submit,
  };
}

it("should show the error when password is not passed", async () => {
  const { username, submit, findByTestId } = setup();
  const event = { target: { value: "jimmy" } };

  server.use(rest.post("/test", (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({error: true, msg: "not good"})
    );
  }));

  fireEvent.change(username, event);
  fireEvent.submit(submit, {
    target: {
      elements: {
        namedItem(name) {
          const items = {
            username: { value: event.target.value },
            password: { value: "" },
          };
          return items[name];
        },
      },
    },
  });

  await findByTestId("error");
});

it("should show the error when password is not passed", async () => {
  const { username, password, submit, findByTestId } = setup();
  const uevent = { target: { value: "jimmy" } };
  const pevent = { target: { value: "password" } };

  server.use(rest.post("/test", (_, res, ctx) => {
    return res(
      ctx.json({ welcome: "there" })
    );
  }));

  fireEvent.change(username, uevent);
  fireEvent.change(password, pevent);
  fireEvent.submit(submit, {
    target: {
      elements: {
        namedItem(name) {
          const items = {
            username: { value: uevent.target.value },
            password: { value: pevent.target.value },
          };

          return items[name];
        },
      },
    },
  });

  await findByTestId("success");
});
