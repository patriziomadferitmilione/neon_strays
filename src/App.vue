<template>
  <div>
    <header style="padding: 1rem;">
      <button @click="toggleLanguage">🌐 {{ lang.toUpperCase() }}</button>
    </header>
    <main>
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
      translationStore: useTranslationStore()
    }
  },
  methods: {
    ...mapActions(useTranslationStore, ['setLanguage']),
    toggleLanguage() {
      const next = this.lang === 'en' ? 'it' : 'en'
      this.setLanguage(next)
    }
  }
}
</script>