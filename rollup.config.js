import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/ReactImgCropper.tsx',
  output: [
    {
      file: 'dist/ReactImgCropper.js',
      format: 'umd',
      sourceMap: false,
      name: 'ReactImgCropper'
    },
    {
      file: 'dist/ReactImgCropper.min.js',
      format: 'umd',
      sourceMap: false,
      name: 'ReactImgCropper',
      plugins: [terser()]
    },
    {
      file: 'es/ReactImgCropper.js',
      format: 'esm',
      sourceMap: false,
      name: 'ReactImgCropper'
    }
  ],
  plugins: [
    postcss({
      extensions: ['.css']
    }),
    typescript(),
    resolve(),
    commonjs({
      namedExports: { react: ['createElement', 'PureComponent'] }
    })
  ]
};
