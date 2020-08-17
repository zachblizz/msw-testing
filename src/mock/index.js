import codegen from "codegen.macro";

codegen`
if (process.env.NODE_ENV === "test") {
    module.exports = "export * from './node-server'"
} else if (process.env.NODE_ENV === "development") {
    module.exports = "export * from './client-server'"
} else {
    module.exports = ""
}
`;
