const { isUsingMeta } = require("../constants");
const useModify = require("./useModify");

function useContext(meta, context) {
    if (typeof meta !== "object" || !meta[isUsingMeta]) throw new Error(`Meta hook useContext requires the object to be tracked by useMeta.`);

    if (typeof context !== "function") throw new Error(`Meta hook useContext requires a callback to use.`);

    const ctx = new Proxy(Object.fromEntries(Object.entries(meta)), {
        get(...args) {
            const v = Reflect.get(...args);

            return v.constructor === Number ? Number(v) : v.constructor === String ? String(v) : v;
        },
        set(target, prop, value, receiver) {
            const v = Object(value);

            Object.defineProperty(v, isUsingMeta, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: target[prop][isUsingMeta],
            });

            Reflect.set(target, prop, v, receiver);

            return useModify(target[prop], value);
        },
    });

    return context(ctx);
}

module.exports = useContext;
