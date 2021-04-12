const { isUsingMeta } = require("../constants");

function useMeta(object) {
    if (typeof object !== "object" || !object) throw new Error(`Meta hook useMeta requires an object to use.`);

    const proxy = new Proxy(object, {
        get(target, prop, receiver) {
            if (prop === isUsingMeta) return true;

            const intermediate = Reflect.get(target, prop, receiver);

            if (typeof intermediate === "undefined") return intermediate;

            const [type, value, constraints] = intermediate;

            const v = Object(value);

            Object.defineProperty(v, isUsingMeta, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: {
                    type,
                    constraints,
                    proxy,
                    prop,
                },
            });

            return v;
        },
        set(target, prop, value, receiver) {
            if (prop === isUsingMeta) return true;

            if (!value[isUsingMeta]) throw new Error(`Meta hook useMeta prohibits mutating values directly.`);

            return Reflect.set(target, prop, value, receiver);
        },
    });

    Object.defineProperty(proxy, isUsingMeta, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: true,
    });

    return proxy;
}

module.exports = useMeta;
