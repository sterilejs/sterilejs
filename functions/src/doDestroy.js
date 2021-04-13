function doDestroy(meta) {
    return Object.fromEntries(
        Object.entries(meta).map(([k, v]) => [k, v.constructor === Number ? Number(v) : v.constructor === String ? String(v) : Object({ ...v })])
    );
}

module.exports = doDestroy;
