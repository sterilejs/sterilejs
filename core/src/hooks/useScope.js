const { isUsingMeta } = require("../constants");

function useScope(meta, callback) {
    if (typeof meta !== "object" || !meta[isUsingMeta]) throw new Error(`Meta hook useScope requires the object to be tracked by useMeta.`);

    if (typeof callback !== "function") throw new Error(`Meta hook useScope requires a callback to use.`);

    const state = { state: undefined };

    const value = (function recurse() {
        return callback(
            meta,
            (cb) => {
                if (typeof cb !== "undefined") {
                    if (typeof cb === "function") cb();
                    else if (cb instanceof Error) throw cb;
                    else state.state = cb;

                    recurse();
                }

                return meta;
            },
            state
        );
    })();

    if (value !== meta) throw new Error(`Meta hook useScope requires the callback to return the meta object.`);

    return meta;
}

module.exports = useScope;
