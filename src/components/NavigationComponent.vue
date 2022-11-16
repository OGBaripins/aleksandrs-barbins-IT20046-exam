<template>
    <nav id="nav-main" class="wrapper-navigation">
        <ol>
            <li>
                <router-link v-for="item in router_data" :to="item.path">{{item.name}}</router-link>
            </li>
        </ol>
    </nav>
</template>

<script>
    import router from "@/router/index.js";
    export default {
    name: "App",
    data(){
        return{
            router,
            router_data: [
                {
                    name:"SONGS", 
                    path:"/"
                },
                {
                    name:"ALBUMS", 
                    path:"/albums"
                },
                {
                    name:"ABOUT", 
                    path:"/about"
                }
            ]
        }
    }
}

</script>