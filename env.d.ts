/// <reference types="vite/client" />

// `.vue` single-file components are understood natively by vue-tsc / Volar,
// so no `declare module '*.vue'` shim is needed here.

// @fontsource packages are CSS-only side-effect imports with no JS exports.
declare module '@fontsource-variable/*'
