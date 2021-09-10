Vue.component('search', {
        data() {
                return {
                        userSearch: '',
                }
        },
        methods: {

        },
        template: `
                             <form action="#" @submit.prevent = $root.$refs.products.filter(userSearch)>
                                <div class="top_service_left_search">
                                <div class="top_service_browse">
                                <details>
                                <summary class="top_text hover_color text">Browse</summary>
                                
                                <div class="browse_drop_menu">
                                    <div class="browse_drop_menu_up">
                                        <header class="browse_drop_menu_header">women</header>
                                        <ul class="browse_drop_menu_text">
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Dresses</a></li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Tops</a>
                                            </li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Sweaters/Knits</a></li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Jackets/Coats</a></li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Blazers</a></li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Denim</a>
                                            </li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Leggins/Pants</a></li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Skirts/Shorts</a></li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Accessorise</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="browse_drop_menu_down">
                                        <header class="browse_drop_menu_header">men</header>
                                        <ul class="browse_drop_menu_text">
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Tees/Tank
                                                    tops</a></li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Shirts/Polos</a>
                                            </li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Sweaters</a>
                                            </li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Sweatshirts/Hoodies</a></li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Blazers</a></li>
                                            <li class="drop_menu_list"><a href="#"
                                                    class="drop_menu_link">Jackets/vests</a></li>
                                        </ul>
                                    </div>
                                </div>
                                </details>
                                </div>
                                    <input class="top_input text" type="text" placeholder="Search for Item..." v-model="userSearch">
                                    <button class="top_button_left" type="submit"><i class="fas fa-search"></i></button>

                                </div>
                            </form>
       
    `
})

/* <div class="top_service_browse">
<details>
<summary class="top_text hover_color text">Browse</summary>

<div class="browse_drop_menu">
    <div class="browse_drop_menu_up">
        <header class="browse_drop_menu_header">women</header>
        <ul class="browse_drop_menu_text">
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Dresses</a></li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Tops</a>
            </li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Sweaters/Knits</a></li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Jackets/Coats</a></li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Blazers</a></li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Denim</a>
            </li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Leggins/Pants</a></li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Skirts/Shorts</a></li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Accessorise</a>
            </li>
        </ul>
    </div>
    <div class="browse_drop_menu_down">
        <header class="browse_drop_menu_header">men</header>
        <ul class="browse_drop_menu_text">
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Tees/Tank
                    tops</a></li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Shirts/Polos</a>
            </li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Sweaters</a>
            </li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Sweatshirts/Hoodies</a></li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Blazers</a></li>
            <li class="drop_menu_list"><a href="#"
                    class="drop_menu_link">Jackets/vests</a></li>
        </ul>
    </div>
</div>
</details>
</div> */

/* <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)">
            <input type="text" class="search-field" v-model="userSearch">
            <button class="button-search button textColor" type="submit" @click ="$root.refs.products.filter(userSearch)">
                <i class=" fas fa-search"></i>
            </button>
        </form> */