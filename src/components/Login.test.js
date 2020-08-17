import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

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
  const { username, submit, getByTestId, debug } = setup();
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

  await wait(() => getByTestId("error"));
  debug();
  // expect(getByTestId("error")).();
});
