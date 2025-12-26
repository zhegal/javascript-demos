// Example 1

const target = {
    v1: 55,
    v2: 66,
};

const handler = {
    get(obj, prop) {
        return obj[prop];
    }
};

const proxy1 = new Proxy(target, handler);

console.log(proxy1.v2);