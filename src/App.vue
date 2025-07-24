<template>
  <div id="app">
    <header class="app-bar">
      <img src="/logo-no-bg-50.png" alt="logo">
      <div class="title">Neon Strays</div>
      <button class="burger" @click="menuOpen = !menuOpen">☰</button>

      <nav :class="{ open: menuOpen }">
        <a href="#intro" @click="menuOpen = false">Intro</a>
        <a href="#mission" @click="menuOpen = false">Mission</a>
        <a href="#music" @click="menuOpen = false">Music</a>
        <select v-model="selectedLang" @change="setLanguage(selectedLang)">
          <option value="en">EN</option>
          <option value="it">IT</option>
          <option value="fr">FR</option>
          <option value="es">ES</option>
        </select>
      </nav>
    </header>
    <main>
      <div class="img-container">
        <img src="/logo-no-bg.png" alt="logo">
      </div>
      <IntroSection />
      <MissionSection />
      <MusicPreviewSection />
    </main>
  </div>
</template>

<script>
import IntroSection from './components/IntroSection.vue'
import MissionSection from './components/MissionSection.vue'
import MusicPreviewSection from './components/MusicPreviewSection.vue'
import { useTranslationStore } from './store/translationStore'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'App',
  components: {
    IntroSection,
    MissionSection,
    MusicPreviewSection
  },
  data() {
    return {
      translationStore: useTranslationStore(),
      selectedLang: 'en',
      menuOpen: false
    }
  },
  computed: {
    ...mapState(useTranslationStore, ['lang'])
  },
  watch: {
    lang(newLang) {
      this.selectedLang = newLang
    }
  },
  methods: {
    ...mapActions(useTranslationStore, ['setLanguage'])
  },
  created() {
    this.setLanguage(this.selectedLang)
  }
}
</script>

<style scoped lang="scss">
#app {
  height: 90vh;
  width: 100vw;
  overflow-y: scroll;

  .app-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--black);
    padding: .5rem;
    color: var(--white);
    position: sticky;
    top: 0;
    z-index: 100;
    height: 10vh;

    img {
      max-height: 100%;
    }

    .title {
      height: 100%;
      font-weight: bold;
      font-size: 1.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .burger {
      font-size: 1.5rem;
      background: none;
      color: var(--white);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin-bottom: .5rem;
    }

    nav {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--black);
      flex-direction: column;
      display: none;
      padding: 1rem;

      a, select {
        display: block;
        padding: 1rem;
        color: var(--white);
        text-decoration: none;
        border-top: 1px solid var(--green);
        background-color: var(--black);
      }

      select {
        background-color: var(--green3);
        color: var(--white);
        border: none;
        width: 50%;
        text-align: center;
        align-self: center;
      }
    }

    nav.open {
      display: flex;
    }
  }

  main {
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .img-container {
      height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100%;
      }
    }
  }
}

@media (min-width: 768px) {
  .burger {
    display: none;
  }

  nav {
    display: flex !important;
    position: static;
    flex-direction: row;
    gap: 1rem;
    align-items: center;

    a, select {
      border: none;
      padding: 0.5rem;
      background: none;
    }

    select {
      width: auto;
    }
  }
}
</style>