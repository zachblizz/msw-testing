// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from "@testing-library/react";

import { server } from "./mock";

// set the node env to test, so we grab the node-server msw instance
process.env.NODE_ENV = "test";

// setup, and cleanup the msw instance
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => {
  cleanup();
  server.close();
});
