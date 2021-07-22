import LgLink from '../src/link.vue'

export default {
title: 'LgLink',
component: LgLink
}

export const Link = _ => ({
components: { LgLink },
template: `
<div>
    <lg-link :disabled="true" href="http://www.google.com">google</lg-link>
</div>
`
})
