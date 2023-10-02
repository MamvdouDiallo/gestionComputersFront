
/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
  "./node_modules/flowbite/**/*.js",
  "./node_modules/tw-elements/dist/js/**/*.js",
  'node_modules/preline/dist/*.js',
];
export const theme = {
  extend: {},
};
export const plugins = [
  require('flowbite/plugin'),
  require("tw-elements/dist/plugin.cjs"),
  require('preline/plugin'),
];

