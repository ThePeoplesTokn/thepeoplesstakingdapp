/* eslint-disable no-dupe-keys */
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {
// Other rules like entry, output, devserver....,
plugins: [
    new NodePolyfillPlugin()
],
resolve: {
    fallback: {
        stream: false
        
    },
    fallback: {
        crypto: false
        
    },
    fallback: {
        http: false
        
    },
    fallback: {
        https: false
    }
}

}