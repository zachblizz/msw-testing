import { setupWorker } from "msw";

import { handlers } from "./handlers";

const server = setupWorker(...handlers);
server.start();

export * from "msw";
export { server }
