<template>
  <section id="music" class="music-section">
    <h2>{{ translations[currentLanguage].music.title }}</h2>

    <div class="ep-container">
      <img class="ep-cover" src="/almostasif.png?url" alt="EP Cover" />
      <div class="ep-info">
        <h3>Debut EP – <span class="price">$9.99</span></h3>
        <button class="buy-ep">Buy Full EP</button>

        <ul class="tracklist">
          <li v-for="(song, index) in songs" :key="index">
            <span>{{ index + 1 }}. {{ song.title }}</span>
            <div class="actions">
              <button @click="play(song)">▶</button>
              <button @click="buy(song)">Buy ${{ song.price }}</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import {useTranslationStore} from "../store/translationStore.js";
import {useMainStore} from "../store/mainStore.js";
import { usePlayerStore } from '../store/playerStore'

export default {
  name: 'MusicPreviewSection',
  data() {
    return {
      store: useMainStore(),
      translationStore: useTranslationStore(),

      songs: [
        { title: 'No Chains Left', url: '/songs/01-no-chains.mp3', price: '1.99' },
        { title: 'Algorithm Burnout', url: '/songs/02-algorithm.mp3', price: '1.99' },
        { title: 'Underground Pulse', url: '/songs/03-pulse.mp3', price: '1.99' },
        { title: 'Echo Chamber Blues', url: '/songs/04-echo.mp3', price: '1.99' },
        { title: 'DIY Anthem', url: '/songs/05-diy.mp3', price: '1.99' }
      ]
    }
  },
  computed: {
    translations() {
      return this.translationStore.translations
    },
    currentLanguage() {
      return this.translationStore.currentLanguage
    }
  },
  methods: {
    play(song) {
      const player = usePlayerStore()
      player.setTrack(song)
    },
    buy(song) {
      alert(`Buying "${song.title}" for $${song.price} – (Payment system not implemented)`)
    }
  }
}
</script>

<style scoped lang="scss">
.music-section {
  text-align: center;
  margin-top: 2rem;

  .ep-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
    }

    .ep-cover {
      width: 250px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .ep-info {
      text-align: left;

      h3 {
        margin-bottom: 0.5rem;
        font-size: 1.5rem;

        .price {
          font-weight: normal;
          color: var(--green3);
        }
      }

      .buy-ep {
        background-color: var(--green3);
        color: white;
        border: none;
        padding: 0.75rem 1.25rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        border-radius: 4px;
      }

      .tracklist {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;

          .actions button {
            margin-left: 0.5rem;
            background: none;
            border: 1px solid var(--green3);
            padding: 0.4rem 0.7rem;
            color: var(--green3);
            border-radius: 4px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
