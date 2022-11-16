<template>
    <div id="login-view">
        <form class="login-form">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input v-model="credentials.uid" id="input-email" placeholder="E-mail" />
            <input v-model="credentials.pwd" id="input-password" placeholder="Password" />
            <button @click="auth()" :disabled="!credentials.uid || credentials.pwd.length<6" id="btn-submit">LOGIN</button>
        </form>
    </div>
</template>

<script>
import {auth} from "@/stores/auth.js";
export default {
    data() {
        return {
            credentials: {
                uid: "",
                pwd: ""
            }
        }
    },
    methods:{
        auth(){
            auth.authenticate(this.credentials.uid, this.credentials.pwd)
        }
    }
}
</script>