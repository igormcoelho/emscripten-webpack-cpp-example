// MIT LICENSE - NeoResearch
// Copyleft 2021

// imports webpack
const webpack = require("webpack");
// imports path library
const path = require("path");
 
module.exports = {
   mode: "development", // TODO: change to production?
   context: path.resolve(__dirname, "."),
   entry: "./index.js",
   output: {
     path: path.resolve(__dirname, "dist"), // find 'dist' folder
     filename: "mylibrary.js",          // goes to dist/
     library: 'MyLibrary',              // names the library module 
     libraryTarget: 'umd',                  // format is Unified Module
     globalObject: 'this' // https://webpack.js.org/configuration/output/
   },
   node: {
      fs: "empty"         // Workaround: disables fs module for node (keeps breaking things!)
    },
   module: {
     rules: [
       // emscripten will target this global js file
       {
         test: /mylibrary_raw_lib\.js$/,
         loader: "exports-loader"
       },
       // emscripten will process this wasm file
       {
         test: /mylibrary_raw_lib\.wasm$/,
         type: "javascript/auto",
         loader: "file-loader",
         // this will rename file with a hash and put it inside dist/ folder
         options: {
           publicPath: "dist/"
         }
       }
     ]
   },
 };