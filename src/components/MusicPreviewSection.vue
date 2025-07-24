<template>
  <section>
    <h2>Listen & Support</h2>
    <div
        v-for="track in tracks"
        :key="track.id"
        style="margin-bottom: 1.5rem;"
    >
      <p style="font-weight: bold;">{{ track.title }}</p>
      <audio :src="track.previewUrl" controls preload="none" />
      <button @click="buyTrack(track)">Buy for €1.00</button>
    </div>
  </section>
</template>

<script>
import {useTranslationStore} from "../store/translationStore.js";
import { mapState } from 'pinia'

export default {
  name: 'MusicPreviewSection',
  data() {
    return {
      translationStore: useTranslationStore(),

      tracks: [
        { id: 1, title: 'Freedom Fire', previewUrl: '/previews/freedom-fire.mp3' },
        { id: 2, title: 'Echoes of Us', previewUrl: '/previews/echoes-of-us.mp3' },
        { id: 3, title: 'No Chains', previewUrl: '/previews/no-chains.mp3' }
      ]
    }
  },
  computed: {
    ...mapState(useTranslationStore, ['translations'])
  },
  methods: {
    buyTrack(track) {
      // Replace this with your payment logic
      alert(`Buying "${track.title}"...`);
    }
  }
}
</script>

<style scoped lang="scss">
section {
  h2 {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    color: var(--green4);
  }

  .track {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--green2);
    padding-bottom: 1rem;
  }

  button {
    margin-top: 0.5rem;
    background-color: var(--green3);
    color: var(--white);
    font-weight: bold;
    border-radius: 4px;
    padding: 0.5rem 1rem;
  }

  button:hover {
    background-color: var(--green4);
    cursor: pointer;
  }
}
</style>
