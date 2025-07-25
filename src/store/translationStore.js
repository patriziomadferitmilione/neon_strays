import { defineStore } from 'pinia'
import { useMainStore } from "./mainStore.js";
import it from "../translations/it";
import en from "../translations/en";
import fr from "../translations/fr";
import es from "../translations/es";

export const useTranslationStore = defineStore('translation', {
    state: () => ({
        store: useMainStore(),
        currentLanguage: 'en',
        translations: {
            it,
            en,
            fr,
            es,
        }
    }),
    actions: {
        setLanguage(lang) {
            this.currentLanguage = lang;
            this.store.menuOpen = false
            this.store.navDropdownOpen = false
        }
    }
})
