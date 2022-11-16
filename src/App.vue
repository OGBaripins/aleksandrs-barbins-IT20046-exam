<template>
    <Header v-if="auth.is_authenticated"></Header>
    <div id="section-body">
        <NavigationComponent v-if="auth.is_authenticated" />
        <router-view class="section-router"></router-view>
    </div>
    <div v-if="auth.is_authenticated" id="section-player">
        <AudioPlayer />
    </div>
</template>

<script>
    import {auth} from "./stores/auth.js";
    import NavigationComponent from "@/components/NavigationComponent.vue"
    export default {
    name: "App",
    data(){
        return{
            auth,
            user_data: {}
        }
    },
    components:{
        NavigationComponent
    }
    }
</script>
