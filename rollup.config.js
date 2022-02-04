
import commonjs    from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';





const fe_iife = {

  input : 'build/typescript/index.js',

  output : {
    file    : 'build/rollup/index.js',
    format  : 'iife',
    exports : 'named',
    name    : 'pwd_bundle'
  },

  plugins : [

    commonjs(),

    nodeResolve({
      mainFields     : ['module', 'main'],
      extensions     : [ '.js' ],
      preferBuiltins : false
    })

  ]

};





export default [ fe_iife ];
