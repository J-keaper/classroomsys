const path = require('path');

module.exports = {

    entry:path.join(__dirname,'src/index.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },

    devtool: 'inline-source-map',

    module:{
        rules: [{
            test: /\.js[x]?$/,
            use:['babel-loader?cacheDirectory=true'],
            include:path.join(__dirname,'./src/')
        },{
            test: /\.(css)$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                },
            ]
        },{
            test: /\.(less)$/,
            use: [
                {
                    loader: "style-loader"
                },{
                    loader: "css-loader"
                },{
                    loader: "less-loader"
                }
            ]
        }

        ]
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback:true,
        proxy:{
            "/api":{
                target:"http://localhost:8080"
            }
        }
    },
};