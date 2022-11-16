import { reactive } from "vue";
import router from "/src/router/index.js";

export const auth = reactive({
    user: {
        name: "Aleksandrs",
        surname: "Barbins",
        code: "IT20046",
        favorite_songs: localStorage.favorite_songs == null ? [] : JSON.parse(localStorage.favorite_songs),
    },

    is_authenticated: localStorage.is_authenticated ?? false,

    setUserData(name, surname, code) {
        this.user.name = name;
        this.surname.name = surname;
        this.code.name = code;
    },

    authenticate(email, password) {
        if (email == "aleksandrs.barbins@va.lv" && password == "password") {
            localStorage.is_authenticated = true;
            this.is_authenticated = true;
            router.push("/");
        }
    },

    logout() {
        localStorage.clear();
        this.is_authenticate = false;
        router.push("/login");
    },

    toggleFavorite(song) {
        if (this.user.favorite_songs.includes(song)) {
            this.user.favorite_songs.push(song);
        } else {
            const index = this.user.favorite_songs.indexOf(song);
            if (index > -1) {
                this.user.favorite_songs.splice(index, 1);
            }
        }
        localStorage.favorite_songs = this.user.favorite_songs;
    },

    getFavoriteSongs() {
        return this.user.favorite_songs;
    },
});
