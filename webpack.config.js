const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    const prod = env && env.production;

    return {
        entry: {
            polyfills: root('src/polyfills.js'),
            main: root('src/main.js'),
            'components/react-app': root('src/components/react-app/main.js'),
            'components/angular-app': root('src/components/angular-app/main.js'),
        },
        output: {
            path: root('dist'),
            filename: prod ? '[name].[chunkhash].js' : '[name].js',
        },
        resolve: {
            extensions: ['.js']
        },
        devServer: {
            port: 4300,
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: root('src/index.html'),
                inject: false,
            }),
            new HtmlWebpackPlugin({
                chunks: ['components/angular-app'],
                filename: 'components/angular-app.html',
                template: root('src/components/angular-app/index.html'),
                inject: false,
            }),
            new HtmlWebpackPlugin({
                chunks: ['components/react-app'],
                filename: 'components/react-app.html',
                template: root('src/components/react-app/index.html'),
                inject: false,
            }),
        ]
    };
};

function root(file) {
    return path.resolve(__dirname, file);
}
