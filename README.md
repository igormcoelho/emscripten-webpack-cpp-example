# emscripten-webpack-cpp-example
Complete example of  Emscripten + Webpack + C++ for Browser and Node

There are many technical challenges, that's why I try to present this as simple as possible,
but also covering complete aspects of this translation of C++ to JS.

So, there are two main examples intended to be quite simple.

### First Example (basic)

A function that computes `x+y`

```
int mylibrary_add(int x, int y) {
   return x+y;
}
```

### Second Example (advanced)

A welcome function that receives a number, deals with memory pointers and invokes an external
c++ function (implemented in JS):

```
int mylibrary_welcome(int x) {
   std::string str("hello");
   std::string str_out("world");
   unsigned char ustr[10];
   //
   const char* bn1 = str.c_str();
   const char* bn_out = str_out.c_str();
   unsigned char* u_out = ustr;
   int y = mylibrary_external_welcome(bn1, bn_out, u_out);
   return x+y+u_out[0];
}
```

## How to build

This works currently on Webpack 4.

```
cd packages/example-webpack4-js
make start
```

Then, open browser on `http://localhost:8080`.

### How does it work

This will compile file `src/mylibrary.cpp` and generate outputs on `build/` and `dist/`.

See [README.md](./packages/example-webpack4-js) inside folder `packages/example-webpack4-js` for
detailed information.

## How to test

### Basic test

This uses prebuilt package files inside `build/` and `dist/`.

Just run command on root (requires `npm` and `node`): `./node-test.sh`

Expected output:

```
test with nodejs .js
js mylibrary_external_welcome: ptr_str1=hello
requires some bytes: 5
out space is '5'
out value is 'world'
out value is 'hello'
should compute input+5+3
18

test with nodejs modules .mjs
WARNING: this is disabled! because --bind is breaking things...
```

### Tests on Browser with Puppeteer (inside package)

```
cd packages/example-webpack4-js
make test
```

### Tests with Node (inside package)

```
cd packages/example-webpack4-js
make node_test
```

## License 

MIT License - Igor Machado Coelho - 2021

Feel free to learn and pass it on!