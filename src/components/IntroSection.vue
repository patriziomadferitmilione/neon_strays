<template>
  <section>
    <p>
      We’re an independent band committed to making music outside the mainstream. We don’t release our songs on streaming platforms, and we refuse to take part in the traditional circuits of the music business. No labels, no algorithms, no compromises — just music made with heart, intention, and total creative freedom.
    </p>

    <p>
      Every song we share is a piece of who we are. We record, produce, and distribute everything ourselves because we believe music should come straight from the artist to the listener — raw, real, and unfiltered. We're not in it for the charts or the fame. We’re in it because we love what we do, and we want to share that with those who genuinely care.
    </p>

    <p>
      When you support us, you’re not just buying a track — you’re keeping this dream alive, helping us fund new gear, write new songs, and stay completely independent. Thank you for being part of something real.
    </p>
    <img src="../../public/logo.png" alt="logo" style="max-width: 100%; border-radius: 8px;" />
  </section>
</template>

<script>
import { useTranslationStore } from "../store/translationStore.js";
import { mapState } from 'pinia'

export default {
  name: 'IntroSection',
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
