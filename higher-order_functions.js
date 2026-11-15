'use strict'

function iterate(object, callback) {
    for (const key of Object.keys(object)) {
        callback(key, object[key], object);
    }
}

function store(value) {
    return () => value;
}

function contract(fn, ...types) {
    return (...args) => {
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] !== types[i].name.toLowerCase()) {
                throw new TypeError();
            }
        }
        const result = fn(...args);
        if (typeof result !== types[types.length - 1].name.toLowerCase()) {
            throw new TypeError();
        }
        return result;
    };
}

const obj = { a: 1, b: 2, c: 3 };
iterate(obj, (key, value) => {
    console.log({ key, value });
});

const read = store(5);
const value = read();
console.log(value);

const add = (a, b) => a + b;
const addNumbers = contract(add, Number, Number, Number);
const res1 = addNumbers(2, 3);
console.dir(res1);

const concat = (s1, s2) => s1 + s2;
const concatStrings = contract(concat, String, String, String);
const res2 = concatStrings('Hello ', 'world!');
console.dir(res2);