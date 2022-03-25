Vue.component('searcher',{
    props:['searchLine'],
    template:
        `<form action = "#" class = "search-form" @submit.prevent = "$emit('search', searchLine)">
                    <input type = "text" class = "search-field" v-model = "$root.searchLine">
                    <button class = "btn-search" type = "submit">
                        <i class = "fas fa-search"></i>
                    </button>
                </form>`
})