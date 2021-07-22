module.exports = plop => {
    plop.setGenerator('component', {
        description: 'create a custom component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'component Name',
                default: 'MyComponent'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'packages/{{name}}/src/{{name}}.vue',
                templateFile: 'plop-template/component/src/component.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/__tests__/{{name}}.vue',
                templateFile: 'plop-template/component/__tests__/component.test.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/stories/{{name}}.stories.js',
                templateFile: 'plop-template/component/stories/component.stories.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/index.hbs',
                templateFile: 'plop-template/component/index.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/LICENSE',
                templateFile: 'plop-template/component/LICENSE'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/package.hbs',
                templateFile: 'plop-template/component/package.hbs'
            },
            {
                type: 'add',
                path: 'packages/{{name}}/README.hbs',
                templateFile: 'plop-template/component/README.hbs'
            }
        ]
    })

}
