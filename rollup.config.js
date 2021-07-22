import fs from "fs";
import path from 'path'
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import {terser} from "rollup-plugin-terser";
import {nodeResolve} from "@rollup/plugin-node-resolve";


const isDev = process.env.NODE_ENV !== 'production'

//公共插件配置
const plugins = [
    vue({
        //Dynamic inject css into a style tag
        css: true,
        //Explicitly convert template to render function
        compileTemplate: true
    }),
    json(),
    nodeResolve(),
    postcss({
        //把css插入到style中
        //inject: true,
        //把css放到和js同一目录
        extract: true
    })
]

//如果不是dev开发环境，则开启压缩
isDev || plugins.push(terser())

const root = path.resolve(__dirname, 'packages')

module.exports = fs.readdirSync(root)
//过滤只保留文件夹
    .filter(item => fs.statSync(path.resolve(root, item)).isDirectory())
    .map(item => {
        const pkg = require(path.resolve(root, item, 'package.json'))
        return {
            input: path.resolve(root, item, 'index.js'),
            output: [
                {
                    exports: 'auto',
                    file: path.resolve(root, item, pkg.main),
                    format: 'cjs'
                },
                {
                    exports: 'auto',
                    file: path.join(root, item, pkg.module),
                    format: 'es'
                }
            ],
            plugins: plugins
        }
    })
