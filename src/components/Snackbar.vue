<template>
  <transition name="fade">
    <div v-if="store.snackbar.visible" class="snackbar" :style="{ backgroundColor: store.snackbar.color }">
      <p class="main">{{ store.snackbar.message }}</p>
      <p class="sub" v-if="store.snackbar.submessage">{{ store.snackbar.submessage }}</p>
    </div>
  </transition>
</template>

<script>
import { useMainStore } from '../store/mainStore';

export default {
  data() {
    return {
      store: useMainStore()
    }
  }
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 999;
  min-width: 250px;
  text-align: center;
}
.main {
  font-weight: bold;
}
.sub {
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
