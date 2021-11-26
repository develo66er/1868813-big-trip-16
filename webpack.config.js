const path = require("path")

module.exports = {
    // указываем путь до входной точки
    entry: "./src/main.js",
    // описываем куда следует поместить результат работы
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    devtool: 'source-map',
    devServer: {
        hot: false
    },
    module: {
      rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: ['babel-loader']
          }
      ]
    }

}