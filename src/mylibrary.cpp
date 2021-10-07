// Basic example for Emscripten + C++ library
#include <emscripten.h>
// C++ includes
#include <string>

// -----------
// Step 1 - simplest example 'mylibrary_sum': just adds x+y
// -----------

extern "C" EMSCRIPTEN_KEEPALIVE
int
mylibrary_add(int x, int y) {
   return x+y;
}

// -----------
// Step 2 - advanced example: 'mylibrary_welcome' allocates strings and 
// invokes 'mylibrary_external_welcome', which is purely implemented in js
// -----------

extern "C" EMSCRIPTEN_KEEPALIVE
int 
mylibrary_external_welcome(const char* bn1, const char* bn_out, unsigned char* u_out);
// implementation of 'mylibrary_external_welcome' is on 'mylibrary_web_exports.js'

extern "C" EMSCRIPTEN_KEEPALIVE
int
mylibrary_welcome(int x) {
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

