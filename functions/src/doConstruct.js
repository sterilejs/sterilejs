const { useMeta } = require("@sterile/core");

function doConstruct(blueprint) {
    return useMeta(
        Object.entries(blueprint).reduce((meta, [key, value]) => {
            const v = Object(value);

            Object.defineProperty(v, Symbol.for("isUsingMeta"), {
                enumerable: false,
                configurable: false,
                writable: false,
                value: true,
            });

            Object.defineProperty(meta, key, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: v,
            });

            return meta;
        }, {})
    );
}

module.exports = doConstruct;
