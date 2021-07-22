import LgInput from '../src/input.vue'

export default {
    title: 'LgInput',
    component: LgInput
}

export const Text = () => ({//对象
    components: {LgInput},
    template: '<lg-input v-model="value"></lg-input>',
    data() {
        return {
            value: 'admin'
        }
    }
})

export const Password = () => ({
    components: {LgInput},
    template: '<lg-input v-model="value" type="password"></lg-input>',
    data() {
        return {
            value: '123456'
        }
    }
})


