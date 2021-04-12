const { inspect } = require("util");

function constrain(type, def, ...constraints) {
    if (constraints.some((c) => typeof c !== "function")) throw new Error(`Meta operator 'constrain' requires constraints to be functions.`);

    if (typeof def === "function") constraints.unshift(def);

    if (!constraints.length) throw new Error(`Meta operator 'constrain' requires at least one constraint.`);

    const instance = new type();

    if (!(instance instanceof Object) && !(instance instanceof Array) && !(instance instanceof Number) && !(instance instanceof String))
        throw new Error(`Meta operator 'constrain' requires type to be a Number, String, Array, or Object.`);

    if (typeof def !== "function" && def.constructor !== type) throw new Error(`Value ${inspect(def)} does not match type ${type.name}.`);

    if (typeof def !== "function") {
        constraints.forEach((constraint) => {
            if (!constraint(def)) throw new Error(`Value ${inspect(def)} does not satisfy constraint '${constraint}'.`);
        });
    }

    return [type, typeof def !== "function" ? def : undefined, constraints];
}

module.exports = constrain;
