const { interceptors } = require("../constants");

function useInterceptor(interceptor) {
    if (typeof interceptor !== "function") throw new Error(`Meta hook useInterceptor requires the interceptor to be a function.`);

    interceptors.push(interceptor);

    return interceptor;
}

module.exports = useInterceptor;
