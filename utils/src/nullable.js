const { constrain, useInterceptor } = require("@sterile/core");

useInterceptor((value, metadata) => {
    if (value.constructor === Nullable) return value.v;
});

class Nullable extends Object {
    constructor(v) {
        super();

        this.v = v;
    }

    valueOf() {
        return this.v;
    }

    toPrimitive() {
        return this.v;
    }

    toString() {
        return this.v;
    }
}

function nullable(def) {
    return constrain(Nullable, new Nullable(def), (v) => {
        return v.constructor === Nullable || typeof v === "undefined";
    });
}

module.exports = nullable;
