function useMixin(...metas) {
    if (metas.length < 2) throw new Error(`Meta hook useMixin requires at least two meta objects.`);

    if (metas.some((m) => !m[Symbol.for("isUsingMeta")])) throw new Error(`Meta hook useMixin requires all parameters to be meta objects.`);

    return metas.slice(1).reduce((obj, meta) => {
        Object.keys(meta).forEach((k) => {
            const { type, constraints, proxy, prop } = meta[k][Symbol.for("isUsingMeta")];

            if (prop in obj) {
                if (obj[prop][Symbol.for("isUsingMeta")].type === type) {
                    obj[prop][Symbol.for("isUsingMeta")].constraints.push(...constraints);
                } else {
                    obj[prop] = meta[k];
                }
            } else if (!(prop in obj)) {
                const v = [type, meta[prop], constraints];

                Object.defineProperty(v, Symbol.for("isUsingMeta"), {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: {
                        type,

                        constraints,
                        proxy,
                        prop,
                    },
                });

                obj[prop] = v;
            }
        });

        return obj;
    }, metas[0]);
}

module.exports = useMixin;
