<template>
    <div id="about-view">
        <div class="wrapper-header">
            <h1>ABOUT ME</h1>
            <div class="settings">
                <button @click="is_editing = !is_editing" id="btn-edit">{{is_editing ? "Cancel" : "Edit Form"}}</button>
                <button v-if="is_editing" id="btn-save">Save Form</button>
            </div>
        </div>
        <form>
            <div class="wrapper-input">
                <label>NAME</label>
                <input v-if="is_editing" id="input-name" />
                <p v-if="!is_editing" id="txt-name">{{auth.user.name}}</p>
            </div>
            <div class="wrapper-input">
                <label>SURNAME</label>
                <input v-if="is_editing" id="input-surname" />
                <p v-if="!is_editing" id="txt-surname">{{auth.user.surname}}</p>
            </div>
            <div class="wrapper-input">
                <label>CODE</label>
                <input v-if="is_editing" id="input-code" />
                <p v-if="!is_editing" id="txt-code">{{auth.user.code}}</p>
            </div>
            <div class="wrapper-songs">
                <label>FAVORITE SONGS</label>
                <ul v-bind:class="{active: auth.user.favorite_songs.length > 0}" >
                    <li v-for="(value) in auth.user.favorite_songs" >
                        <img id="img-album" :src="value.album.images[0].url" />
                        <div class="song-info">
                            <p id="txt-song" class="song-name">{{value.album.name}}</p>
                            <p id="txt-artist" class="song-artists">{{get_artist(value.artists)}}</p>
                        </div>
                    </li>
                </ul>
                <div id="txt-empty" class="empty">NO SONGS FOUND</div>
            </div>
        </form>
    </div>
</template>

<script>
import {auth} from "@/stores/auth";
export default{
    data() {
        return {
            auth,
            is_editing: false
        }
    },
    methods: {
        get_artist(artist_arr){
            return artist_arr.map(el => el.name).join(", ")

        }
    }
}
</script>

