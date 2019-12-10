import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './ReactImgCropper.tsx',
  output: {
    file: 'lib/ReactImgCropper.js',
    format: 'iife',
    exports: 'named',
    sourcemap: true
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs()
  ]
}