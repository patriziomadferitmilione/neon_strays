<template>
  <section id="mission">
    <h2>{{ translations[currentLanguage].mission.title }}</h2>
    <p v-for="(line, index) in translations[currentLanguage].mission.missionCopy" :key="index">
      {{ line }}
    </p>

    <!-- Article 1 -->
    <div class="article-container">
      <h3 @click="toggleArticle(1)" class="expandable-header">
        {{ translations[currentLanguage].mission.articleOneH1 }}
        <span>{{ expandedArticles[1] ? '▲' : '▼' }}</span>
      </h3>
      <transition name="fade">
        <div v-show="expandedArticles[1]" class="article-content">
          <div class="img-container">
            <img src="/article-one.png?url" alt="article-one">
          </div>
          <p v-for="(line, index) in translations[currentLanguage].mission.article_one" :key="'a1-' + index">
            {{ line }}
          </p>
        </div>
      </transition>
    </div>

    <!-- Article 2 -->
    <div class="article-container">
      <h3 @click="toggleArticle(2)" class="expandable-header">
        Breaking the Algorithmic Chains: Our Stand for Authentic Music
        <span>{{ expandedArticles[2] ? '▲' : '▼' }}</span>
      </h3>
      <transition name="fade">
        <div v-show="expandedArticles[2]" class="article-content">
          <div class="img-container">
            <img src="/article-two.png?url" alt="article-two">
          </div>
          <p v-for="(line, index) in translations[currentLanguage].mission.article_two" :key="'a2-' + index">
            {{ line }}
          </p>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { useMainStore } from "../store/mainStore.js";
import { useTranslationStore } from "../store/translationStore.js";

export default {
  name: 'MissionSection',
  data() {
    return {
      store: useMainStore(),
      translationStore: useTranslationStore(),
      expandedArticles: {
        1: false,
        2: false
      }
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
    toggleArticle(id) {
      this.expandedArticles[id] = !this.expandedArticles[id];
    }
  }
}
</script>

<style scoped lang="scss">
section {
  height: fit-content;
  text-align: justify;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  margin: 1rem 0;
  padding: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.6;
  }
}

.article-container {
  margin-top: 2rem;

  .expandable-header {
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 6px;
    transition: background 0.2s ease-in-out;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }
  .fade-enter-to, .fade-leave-from {
    opacity: 1;
    max-height: 1000px; // large enough to accommodate text
  }

  .article-content {
    padding: 1rem;
    margin-top: 0.5rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 6px;

    .img-container {
      img {
        max-width: 100%;
      }
    }
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