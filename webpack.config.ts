import path from 'path'

import { Configuration } from 'webpack'
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
const config: Configuration = {

    mode: 'development',
    devtool: 'source-map',
    entry: {
        lib: {
            import: ['react', 'react-dom']
        },
        
        project1Bundle: {
            import: './src/Project1/Project1Index.tsx',
            dependOn: 'lib'
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: "tsconfig.json"
                }
            }],
            exclude: /node_modules/, 
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',

        path: path.resolve(__dirname, 'public/packed'),

        chunkFilename: '[id].[chunkhash].js'
    },
    plugins: [
        // new MonacoWebpackPlugin({languages: ['typescript', 'javascript', 'json']})
    ]
};

export default config;