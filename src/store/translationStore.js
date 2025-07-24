import { defineStore } from 'pinia'

export const useTranslationStore = defineStore('translation', {
    state: () => ({
        lang: 'en',
        translations: {}
    }),
    actions: {
        async setLanguage(lang) {
            this.lang = lang
            const messages = await import(`@/i18n/${lang}.js`)
            this.translations = messages.default
        }
    }
})