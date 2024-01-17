/*
 Declaration files are used in TypeScript to define the shape of an existing JavaScript code not written in TypeScript.
 They don't contain any actual executable code, just type declarations.

 These files are used to provide TypeScript type information about an API that's written in JavaScript.
 This could be a library or a set of functions for which you do not have the TypeScript source

 d.ts files do not turn into JavaScript. They are only used by the TypeScript compiler for type checking and intellisense in your editor.
 */

declare module 'vanta/dist/vanta.waves.min.js' {
    export default function WAVES(options: any): any;
}
