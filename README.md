## 安装测试依赖

```
yarn add jest @vue/test-utils vue-jest babel-jest -D -W
```
##### 配置测试脚本
- package.json

```
"scripts":{
    "test": "jest"
}
```
##### Jest 配置文件
- jest.config.js

```
module.exports ={
     "testMatch": ["**/__tests__/**/*.[jt]s?(x)"],
     "moduleFileExtensions":[
     "js",
     "json",
     //告诉Jest处理'*.vue'文件
     "vue"
     ]，
     "transform":{
         //用'vue-jest'处理'*.vue'文件
         ".*\\.(vue)$":"vue-jest",
         //用'babel-jest'处理js
         ".*\\.(js)$":"babel-jest"
     }
}
```

##### Babel配置文件
- babel.config.js

```
module.exports={
    presets:[
     [
        '@babel/preset-env'
     ]
    ]
}
```
##### Babel桥接
- yarn add babel-core@bridge -D -W 

### 安装Rollup 以及所需的插件
- yarn add rollup rollup-plugin-terser rollup-plugin-vue@5.1.9 vue-template-compiler -D -W

### Rollup 配置文件
在button目录中创建rollup.config.js

```
import {terser} from "rollup-plugin-terser";
import vue from 'rollup-plugin-vue'

module.exports = [
    {
        input: 'index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'es'
            }
        ],
        plugins: [
            vue({
                //Dynamically inject css as a <style> tag
                css: true,
                compileTemplate: true
            }),
            terser()
        ]
    }
]
```
- button里面的package.json文件添加脚本命令
```
   "build": "rollup -c"
```
- yarn workspace lg-button run build

### 安装依赖
- yarn add @rollup/plugin-json rollup-plugin-postcss @rollup/plugin-node-resolve -D -W

### 配置文件
项目根目录创建rollup.config.js
```
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

```

### 根目录下的package.json文件添加脚本命令
```
"build": "rollup -c"
```

### packages目录下的button,form,formItem,input中的package.json文件添加配置：
```
  "main": "dist/cjs/index.js",
  "module": "dist/es/index.js",
```
#### 终端命令行执行yarn build即可在packages/button/dist目录下看到打包的cjs/index.js,es/index.js文件。从两个文件最后一句导出语句可以看出，
其中cjs是commonjs模块，es是ES模块。
