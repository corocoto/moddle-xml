import terser from '@rollup/plugin-terser';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import fs from 'node:fs';


const pkg = JSON.parse(fs.readFileSync('./package.json'));

function pgl(plugins = []) {
  return plugins;
}

const srcEntry = pkg.source;

const umdDist = pkg['umd:main'];

const umdName = 'ModdleXML';

export default [

  // browser-friendly UMD build
  {
    input: srcEntry,
    output: {
      file: umdDist.replace(/\.js$/, '.prod.js'),
      format: 'umd',
      name: umdName
    },
    plugins: pgl([
      resolve(),
      commonjs(),
      terser()
    ])
  },
  {
    input: srcEntry,
    output: {
      file: umdDist,
      format: 'umd',
      name: umdName
    },
    plugins: pgl([
      resolve(),
      commonjs()
    ])
  },
  {
    input: srcEntry,
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true }
    ],
    external: [
      'min-dash',
      'moddle',
      'saxen'
    ],
    plugins: pgl()
  }
];