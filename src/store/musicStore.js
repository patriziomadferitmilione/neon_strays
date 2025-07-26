import { defineStore } from 'pinia';

export const useMusicStore = defineStore('music', {
    state: () => ({
        songs: [],
        albums: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchSongs() {
            this.loading = true;
            try {
                const res = await fetch('http://localhost:5000/api/songs');
                this.songs = await res.json();
            } catch {
                this.error = 'Could not load songs';
            } finally {
                this.loading = false;
            }
        },
        async fetchAlbums() {
            try {
                const res = await fetch('http://localhost:5000/api/albums');
                this.albums = await res.json();
            } catch {
                this.error = 'Could not load albums';
            }
        },
        async createAlbum(title, releaseDate = '') {
            try {
                const res = await fetch('http://localhost:5000/api/albums', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${useMainStore().token}`
                    },
                    body: JSON.stringify({ title, releaseDate })
                });
                const newAlbum = await res.json();
                this.albums.push(newAlbum);
                return newAlbum;
            } catch {
                this.error = 'Album creation failed';
            }
        }
    }
});
