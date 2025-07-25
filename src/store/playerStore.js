import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        currentTrack: null,
        isPlaying: false,
        progress: 0
    }),
    actions: {
        setTrack(track) {
            this.currentTrack = track
            this.isPlaying = false
            this.progress = 0
        },
        play() {
            this.isPlaying = true
        },
        pause() {
            this.isPlaying = false
        },
        stop() {
            this.isPlaying = false
            this.currentTrack = null
            this.progress = 0
        },
        setProgress(value) {
            this.progress = value
        }
    }
})
