const sterile = require("@sterile/core");

const readonly = require("./readonly");
const nullable = require("./nullable");

const m = sterile.useMeta({
    str: nullable("hello world"),
});

console.log(m.str);

console.log(m.str.v);

module.exports = { readonly };
