Vue.component('search', {
    data() {
        return {
            userSearch: '',
        }
    },
    methods: {

    },
    template: `
        <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)">
            <input type="text" class="search-field" v-model="userSearch">
            <button class="button-search button textColor" type="submit" @click ="$root.refs.products.filter(userSearch)">
                <i class=" fas fa-search"></i>
            </button>
        </form>
    `
})