"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo(req, res) {
    res.type("text/json").send(JSON.stringify({ message: "Hello from server foo function" }));
}
exports.foo = foo;
function bar(req, res) {
    res.type("text/json").send(JSON.stringify({ message: "Hello from server bar function" }));
}
exports.bar = bar;
function default_1(req, res) {
    let identity = req.identity;
    let name = identity && identity.name || "Unknown User";
    res.type("text/json").send(JSON.stringify({ message: `Hello ${name} from server default function` }));
}
exports.default = default_1;
