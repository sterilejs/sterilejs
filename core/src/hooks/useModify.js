const { inspect } = require("util");

const { isUsingMeta } = require("../constants");

function useModify(v, n) {
    if (typeof v === "undefined") throw new Error(`Meta hook useModify requires a value to modify.`);

    if (!v[isUsingMeta]) throw new Error(`Meta hook useModify requires the value to be tracked by useMeta.`);

    if (!v[isUsingMeta].type) throw new Error(`Assertion failed; value tracked by useMeta does not have its type.`);

    if (!v[isUsingMeta].constraints) throw new Error(`Assertion failed; value tracked by useMeta does not have its constraints.`);

    if (!v[isUsingMeta].proxy) throw new Error(`Assertion failed; value tracked by useMeta does not have its root.`);

    if (!v[isUsingMeta].prop) throw new Error(`Assertion failed; value tracked by useMeta does not have its name.`);

    const { type, constraints, proxy, prop } = v[isUsingMeta];

    if (n.constructor !== type) throw new Error(`Value ${inspect(n)} does not match type ${type.name}.`);

    constraints.forEach((constraint) => {
        if (!constraint(n)) throw new Error(`Value ${inspect(n)} does not satisfy constraint '${constraint}'.`);
    });

    const value = [type, n, constraints];

    Object.defineProperty(value, isUsingMeta, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: true,
    });

    proxy[prop] = value;

    return true;
}

module.exports = useModify;
