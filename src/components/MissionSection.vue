<template>
  <section id="mission">
    <h2>Our Mission</h2>
    <p v-for="(line, index) in translations.mission" :key="index">
      {{ line }}
    </p>
  </section>
</template>

<script>
import { useTranslationStore } from "../store/translationStore.js";
import { mapState } from 'pinia'

export default {
  name: 'MissionSection',
  data() {
    return {
      translationStore: useTranslationStore()
    }
  },
  computed: {
    ...mapState(useTranslationStore, ['translations'])
  }
}
</script>

<style scoped lang="scss">
section {
  height: fit-content;
  text-align: justify;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  margin: 1rem 0 1rem 0;

  p {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.5;
  }
}

@media (max-width: 768px) {
  section {
    padding: 1.5rem;
    font-size: 0.95rem;
    text-align: justify;
  }
}
</style>