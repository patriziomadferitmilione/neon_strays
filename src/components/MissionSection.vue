<template>
  <section>
    <h2>Our Mission</h2>
    <p v-for="(line, index) in translations.mission" :key="index">
      {{ line }}
    </p>
  </section>
</template>

<script>
import { useTranslationStore } from "../store/translationStore.js";

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
