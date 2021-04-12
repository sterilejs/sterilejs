const { constrain } = require("@sterile/core");

function readonly(type, def) {
    if (typeof def === "undefined") throw new Error(`Meta operator 'readonly' requires a value.`);

    const v = Object(def);

    const r = Symbol("readonly");

    Object.defineProperty(v, r, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: true,
    });

    return constrain(type, v, (v) => {
        if (!v[r]) throw new Error(`Meta value is readonly and cannot be modified.`);

        return true;
    });
}

module.exports = readonly;
