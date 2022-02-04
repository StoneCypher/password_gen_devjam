
const fe_iife = {

  input : 'build/typescript/index.js',

  output : {
    file    : 'build/rollup/index.js',
    format  : 'iife',
    exports : 'named',
    name    : 'pwd_bundle'
  },

  plugins : []

};





export default [ fe_iife ];
