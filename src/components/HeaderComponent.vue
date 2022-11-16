<template>
    <div id="main-header" class="active">
        <div class="wrapper-logo">
            <img src="@/assets/logo.svg"/>
            <h2>KRAKEN.FM</h2>
        </div>
        <div class="wrapper-profile">
            <div class="section-user">
                <span class="avatar"></span>
                <h3 id="txt-full-name">{{auth.user.name +" "+ auth.user.surname}}</h3>
            </div>
            <button @click="auth.logout()" id="btn-logout">LOGOUT</button>
        </div>
    </div>
</template>

<script>
import {auth} from "@/stores/auth";
export default{
    data() {
        return {
            auth
        }
    }
}
</script>
