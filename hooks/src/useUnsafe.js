function useUnsafe(meta) {
    const o = Object.fromEntries(
        Object.entries(meta).map(([k, v]) => [k, v.constructor === Number ? Number(v) : v.constructor === String ? String(v) : Object({ ...v })])
    );

    return [
        o,
        () => {
            Object.keys(meta).forEach((k) => {
                const { type, constraints, proxy, prop } = meta[k][Symbol.for("isUsingMeta")];

                const v = [type, o[prop], constraints];

                Object.defineProperty(v, Symbol.for("isUsingMeta"), {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: true,
                });

                Reflect.deleteProperty(proxy, prop);

                Reflect.set(proxy, prop, v);
            });

            return o;
        },
    ];
}

module.exports = useUnsafe;

// ! doDestroy

// function useUnsafe(meta) {
//     return Object.fromEntries(
//         Object.entries(meta).map(([k, v]) => [k, v.constructor === Number ? Number(v) : v.constructor === String ? String(v) : Object({ ...v })])
//     );
// }

// module.exports = useUnsafe;
