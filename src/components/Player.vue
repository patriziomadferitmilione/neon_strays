<template>
  <div class="player" v-if="currentTrack">
    <div class="track-info">
      <span>{{ currentTrack.title }}</span>
      <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
    </div>
    <audio ref="audio" :src="currentTrack.url" @ended="onEnd" @timeupdate="updateTime"></audio>
    <progress :value="progress" max="1"></progress>
  </div>
</template>

<script>
import { usePlayerStore } from '../store/playerStore'
import { mapState } from 'pinia'

export default {
  name: 'Player',
  computed: {
    ...mapState(usePlayerStore, ['currentTrack', 'isPlaying', 'progress'])
  },
  methods: {
    togglePlay() {
      const player = usePlayerStore()
      const audio = this.$refs.audio

      if (this.isPlaying) {
        audio.pause()
        player.pause()
      } else {
        audio.play()
        player.play()
      }
    },
    updateTime() {
      const audio = this.$refs.audio
      const player = usePlayerStore()
      player.setProgress(audio.currentTime / audio.duration)
    },
    onEnd() {
      usePlayerStore().stop()
    }
  }
}
</script>

<style scoped>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--black);
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.track-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
}

progress {
  width: 100%;
  height: 6px;
  margin-top: 0.5rem;
}
</style>
