<template>
  <section id="intro">
    <div class="overlay">
      <div class="content">
        <h1>Neon Strays</h1>
        <p v-for="(line, index) in translations[currentLanguage].intro.introCopy" :key="index">
          {{ line }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  import { useTranslationStore } from '../store/translationStore.js'
  import {useMainStore} from "../store/mainStore.js";

  export default {
    name: 'IntroSection',
    data() {
      return {
        store: useMainStore(),
        translationStore: useTranslationStore()
      }
    },
    computed: {
      translations() {
        return this.translationStore.translations
      },
      currentLanguage() {
        return this.translationStore.currentLanguage
      }
    }
  }
</script>

<style scoped lang="scss">
section {
  background: var(--dark-green);
  height: 80vh;
  width: 100%;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 0 2rem 0;

  .content {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 8px;

    p {
      margin-bottom: 1.5rem;
      font-size: 1rem;
      line-height: 1.5;
    }
  }
}

@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
    font-size: 0.95rem;
    text-align: justify;
  }
}
</style>