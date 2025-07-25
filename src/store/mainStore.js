import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        menuOpen: false,
        navDropdownOpen: false
    }),

    getters: {
    },

    actions: {
    }
});
