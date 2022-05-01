import path from 'path'

import { Configuration } from 'webpack'
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
var nodeExternals = require('webpack-node-externals');
const webConfig: Configuration = {

    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        
        'lib': {
            import: ['react', 'react-dom']
        },

        'project1Bundle': {
            import: './src/Project1/Project1Index.tsx',
            dependOn: 'lib'
        },
        'project2Bundle': {
            import: './src/Project2/Project2Index.tsx',
            dependOn: 'lib'
        },
        'project3Bundle': {
            import: './src/Project3/Project3Index.tsx',
            dependOn: 'lib'
        },

    },
    // target: 'web',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        configFile: "tsconfig.json"
                    }
                }],
            exclude: /node_modules/,
        }, {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'public/packed/[name].js',

        path: path.resolve(__dirname),
        libraryTarget: 'commonjs',

        chunkFilename: '[id].[chunkhash].js'
    },
    
    plugins: [
        // new MonacoWebpackPlugin({languages: ['typescript', 'javascript', 'json']})
    ],

};
const functionsConfig: Configuration = {

    mode: 'development',
    devtool: 'source-map',
    entry: {
        'index': {
            import: './srcFunctions/WPFunctions.ts'
        },
        
    },
    target: 'node',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        configFile: "tsConfigFunctions.json"
                    }
                }],
            exclude: /node_modules/,
        }, {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    externals: [nodeExternals(),'firebase-admin', 'firebase-functions', 'firebase','fs/promises'],
    output: {
        filename: '[name].js',
        publicPath: '/',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname,'functions'),
        // libraryTarget: 'commonjs',
        // chunkFilename: '[id].[chunkhash].js'
    },
    plugins: [
        // new MonacoWebpackPlugin({languages: ['typescript', 'javascript', 'json']})
    ],
    
};

export default [webConfig, functionsConfig];