import { cleanup } from "@testing-library/react";

import { server } from "./src/mock";

// set the node env to test, so we grab the node-server msw instance
process.env.NODE_ENV = "test";
console.log("here")

// setup, and cleanup the msw instance
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => {
  cleanup();
  server.close();
});
