const { inspect } = require("util");

require("colors");

function logger(obj) {
    return new Proxy(
        Object(obj),
        Reflect.ownKeys(Reflect).reduce((obj, cur) => {
            obj[cur] = function (...args) {
                console.log(cur.green, ...args.map((i) => inspect(i, undefined, undefined, true)));

                return Reflect[cur](args);
            };

            return obj;
        }, {})
    );
}

module.exports = logger;
