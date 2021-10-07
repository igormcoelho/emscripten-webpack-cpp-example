var module = require('../build/mylibrary_raw_lib.js')

module().then(
    wasmModule => {
        var x = wasmModule._mylibrary_welcome(10);
        console.log(x);
    }
);
