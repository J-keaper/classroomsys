const path = require('path');
const webpack = require('webpack'); //访问内置的插件

module.exports = env => ({

        entry:{
            bundle:path.join(__dirname,'src/index.js'),
            vendor:['react','antd','axios','react-dom','react-redux','react-router','react-router-dom',
            'redux','redux-thunk']
        },
        output:{
            path:path.join(__dirname,'./dist'),
            filename:'bundle.js'
        },

        devtool: env.production ? false :'inline-source-map',

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
            contentBase: path.join(__dirname, '/dist/'),
            historyApiFallback:true,
            proxy:{
                "/api":{
                    target:"http://localhost:8080"
                },
                "/file":{
                    target:"http://localhost:8080"
                }
            }
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name:"vendor",
                filename:"vendor.js",
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,
                    pure_funcs: ['console.log']
                },
                sourceMap: false
            })
        ]
    }
);