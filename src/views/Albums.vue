<template>
<div id="album-view">
    <div class="wrapper-header">
        <h1>ALBUMS</h1>
        <div class="settings">
            <button v-bind:class="{active: this.is_active_grid}" @click="yes()" id="btn-grid"><IconGrid /></button>
            <button v-bind:class="{active: this.is_active_list}" @click="yes()" id="btn-list"><IconList /></button>
        </div>
    </div>
    <ul v-bind:class="{grid: this.is_active_grid}" id="list-albums">
        <li @click="selectAlbum(value.album)" 
        v-for="(value, index) in this.songs" 
        v-bind:class="{active: value.album.id == player.getNowPlayingAlbumID()}" class="album">
            <img id="img-album" :src="value.album.images[0].url" />
            <div class="album-info">
                <h4 id="txt-album-name">{{value.album.name}}</h4>
                <p id="txt-album-artists">{{this.get_artist(value.album.artists)}}</p>
                <div class="album-year">
                    <p id="txt-album-year">{{value.album.release_date.split("-")[0]}}</p>
                    <p id="txt-album-tracks">yes</p>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import { player } from '@/stores/player';
import songs from "@/data/songs";

export default {
    data() {
        return {
            player,
            songs,
            is_active_grid: true,
            is_active_list: false,
        }
    },
    methods: {
        get_artist(artist_arr){
            return artist_arr.map(el => el.name).join(", ")

        },
        selectAlbum(){
            
        }
    }
}
</script>