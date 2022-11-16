<template>
    <div id="songs-view" @scroll="handleScroll">
        <div class="wrapper-header">
            <h1>SONGS</h1>
            <div class="wrapper-search">
                <input v-model="search" id="input-search" placeholder="Search by title..." />
            </div>
            <div class="wrapper-settings">
                <button @click="show_favorites_func()" v-bind:class="{active: show_favorites}" id="btn-show-favorites">Show Favorites</button>
            </div>
        </div>
        <div class="wrapper-songs">
            <table cellspacing="0" cellpadding="0">
                <tr ref="header">
                    <th id="th-id" >#</th>
                    <th @click="sort_by('name')" v-bind:class="{active: by_title.active}" id="th-title">
                        Title
                        <IconCaretUp :class="{ 'flip-vertical': is_descending == true }" :active="by_title.active " />
                    </th>
                    <th id="th-artist">Artist</th>
                    <th id="th-album">Album</th>
                    <th @click="sort_by('duration_ms')" v-bind:class="{active: by_duration.active}" id="th-duration">
                        Duration
                        <IconCaretUp :class="{ 'flip-vertical': is_descending == true }" :active="by_duration.active " />
                    </th>
                </tr>
                <!-- Loop goes on this <tr> element -->
                <tr v-for="(value, index) in player.playlist" v-bind:key="index" class="song">
                    <td id="td-index">
                        <IconPlay v-show="value.id == now_playing_id" />
                        <span id="txt-index">{{index+1}}</span>
                    </td>
                    <td id="td-title">
                        <img :src="value.album.images[1].url" />
                        {{value.name}}
                    </td>
                    <td id="td-artist">{{getArtist(value.artists)}}</td>
                    <td id="td-album">{{value.album.name}}</td>
                    <td id="td-duration">
                        {{getTime(value.duration_ms)}}
                        <IconHeart @click="check_favorite(value)" 
                            v-bind:class="{active: auth.user.favorite_songs.includes(value)}"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import {auth} from "@/stores/auth";
import songs from "@/data/songs";
import {player} from "@/stores/player"
import IconHeart from "@/components/icons/IconHeart.vue"
player.setPlaylist(songs)
export default {
    name: "Songs",
    data() {
        return {
            search: "",
            show_favorites: false,
            by_title: {
                active: false,
                clicks: 0
            },
            by_duration: {
                active: false,
                clicks: 0
            },
            is_descending: false,
            // true ? this.by_duration.clicks == 2 || this.by_title.clicks == 2 : false,
            songs_arr: songs,
            filtered_songs: [],
            now_playing_id: player.getNowPlayingSongId(),
            // favorite_songs: auth.user.favorite_songs,
            player,
            auth
            
        }
    },
    methods: {
        handleScroll(event) {
            this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
        },
        sort_by(type){
            if(type == 'name'){
                console.log(this.by_title.clicks)
                this.by_duration.active = false
                    this.by_title.clicks+=1;
                    player.playlist.sort((a,b) => {
                        var textA = a.name.toUpperCase();
                        var textB = b.name.toUpperCase();
                        if(this.by_title.clicks==1){
                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        }else if(this.by_title.clicks==2){
                            return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                        }else{
                            this.by_title.clicks = 0
                            this.by_title.active = false
                            player.setPlaylist(songs)
                        }
                    
                })
            }else{
                console.log(this.by_duration.clicks)
                this.by_title.active = false
                if(this.by_duration.clicks == 0){
                    this.by_duration.active = true
                    this.by_duration.clicks+=1;
                    player.playlist.sort((a,b) =>  a.duration_ms - b.duration_ms)
                    return 1;
                }
                if(this.by_duration.clicks == 1){
                    this.by_duration.active = true
                    this.by_duration.clicks+=1;
                    player.playlist.sort((a,b) =>  a.duration_ms + b.duration_ms)
                    return 1;
                }else{
                    this.by_duration.active = false
                    this.by_duration.clicks = 0;
                    player.setPlaylist(songs)
                    return 1;
                }
                
            }
            
        },
        
        selectSong(song){
            player.setNowPlaying(song)
        },
        getArtist(artist_arr){
            return artist_arr.map(el => el.name).join(", ")

        },
        getTime(duration_ms){
            var millis = parseInt(JSON.stringify(duration_ms))
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        },
        toggle_favorite(song_id){
            auth.toggleFavorite(song_id)
        },
        check_favorite(song){
            if(auth.user.favorite_songs.includes(song)){
                auth.user.favorite_songs.splice(auth.user.favorite_songs.indexOf(song),1)
            }else{
                auth.user.favorite_songs.push(song)
            }
            localStorage.favorite_songs = JSON.stringify(auth.getFavoriteSongs())
        },
        show_favorites_func(){
            this.show_favorites = !this.show_favorites
            if(this.show_favorites){
                player.setPlaylist(auth.user.favorite_songs)
            }else{
                player.setPlaylist(songs)
            }
        }

    },
    components:{
        IconHeart
    }
}
</script>