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
