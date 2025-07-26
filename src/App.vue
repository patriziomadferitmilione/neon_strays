<template>
  <div id="app">
    <div class="app-container" v-if="store.isLoggedIn">
      <header class="app-bar">
        <a href="#top" class="logo-link">
          <img src="/logo-no-bg-50.png" alt="logo">
        </a>
        <div class="title">Neon Strays</div>
        <button class="burger" @click="store.menuOpen = !store.menuOpen">☰</button>

        <nav :class="{ open: store.menuOpen }">
          <a href="#intro" @click="store.menuOpen = false">{{ translations[currentLanguage].nav.intro }}</a>
          <a href="#mission" @click="store.menuOpen = false">{{ translations[currentLanguage].nav.mission }}</a>
          <a href="#music" @click="store.menuOpen = false">{{ translations[currentLanguage].nav.music }}</a>
          <div class="bottom">
            <div class="custom-lang-dropdown" @click="store.navDropdownOpen = !store.navDropdownOpen" ref="dropdown">
              <div class="selected">{{ translationStore.currentLanguage.toUpperCase() }}</div>
              <div class="options" v-if="store.navDropdownOpen">
                <div v-for="lang in ['en', 'it', 'fr', 'es']" :key="lang" @click.stop="translationStore.setLanguage(lang)">
                  {{ lang.toUpperCase() }}
                </div>
              </div>
            </div>
            <button @click.stop="store.isLoggedIn ? store.logout() : store.showLoginModal = true">
              {{ store.isLoggedIn ? 'Logout' : 'Login' }}
            </button>
          </div>
        </nav>
      </header>
      <main>
        <div class="img-container" id="top">
          <img src="/logo-no-bg.png" alt="logo">
        </div>
        <div class="live-img-container">
          <img src="/intro.jpg?url" alt="live">
        </div>
        <IntroSection />
        <div class="live-img-container-2">
          <img src="/DEN_0302%20copia.JPG?url" alt="live">
        </div>
        <MissionSection />
        <MusicPreviewSection />
        <Player />
      </main>
    </div>

    <Login v-else />
  </div>
</template>

<script>
import {useMainStore} from "./store/mainStore.js";
import { useTranslationStore } from './store/translationStore'

// components
import IntroSection from './components/IntroSection.vue'
import MissionSection from './components/MissionSection.vue'
import MusicPreviewSection from './components/MusicPreviewSection.vue'
import Player from './components/Player.vue'
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    IntroSection,
    MissionSection,
    MusicPreviewSection,
    Player,
    Login
  },
  data() {
    return {
      store: useMainStore(),
      translationStore: useTranslationStore(),
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.store.loadFromStorage();
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
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
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.store.navDropdownOpen = false;
      }
    }
  },
}
</script>

<style scoped lang="scss">
#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;

  .app-container {
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
      box-shadow: #00522D 0 2px 15px;

      .logo-link {
        height: 100%;
        max-height: 100%;

        img {
          max-height: 100%;
        }
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
        height: 30vh;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--dark-green);
        flex-direction: column;
        display: none;
        padding: 1rem;
        text-align: left;

        a {
          display: block;
          padding: 1rem;
          color: var(--white);
          text-decoration: none;
          border-bottom: 1px solid var(--green);
        }

        a:last-of-type {
          border-bottom: none;
        }

        .bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;

          .custom-lang-dropdown {
            border-radius: 4px;
            position: relative;
            width: 50%;
            height: 3rem;
            background-color: var(--green3);
            color: var(--white);
            text-align: center;
            line-height: 3rem;
            cursor: pointer;
            user-select: none;

            .selected {
              font-weight: bold;
            }

            .options {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background: var(--green3);
              border-top: 1px solid var(--green);
              z-index: 10;

              div {
                padding: 0.75rem 0;
                border-bottom: 1px solid var(--green);
                font-size: 0.95rem;

                &:hover {
                  background-color: var(--green);
                }
              }

              div:last-of-type {
                border-bottom: none;
              }
            }
          }

          button {
            border-radius: 4px;
            background-color: var(--green3);
            color: var(--white);
            border: none;
            width: 50%;
            height: 3rem;
            text-align: center;
            align-self: center;
            margin: 0;
          }
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
      padding-bottom: 7rem;

      .img-container {
        height: 85vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          max-width: 100%;
        }
      }

      .live-img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70vh;
        margin: 1rem 0 1rem 0;

        img {
          max-width: 100%;
          opacity: 0.9;
          box-shadow: #00522D 0 2px 15px;
        }
      }

      .live-img-container-2 {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;

        img {
          max-width: 100%;
          opacity: 0.7;
          box-shadow: #00522D 0 2px 15px;
        }
      }
    }
  }
}

</style>