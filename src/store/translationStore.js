import { defineStore } from 'pinia'

export const useTranslationStore = defineStore('translation', {
    state: () => ({
        lang: 'en',
        translations: {}
    }),
    actions: {
        async setLanguage(lang) {
            this.lang = lang
            try {
                const messages = await import(`../translations/${lang}.js`)
                this.translations = messages.default
            } catch (e) {
                console.error(`Translation for '${lang}' not found.`)
                this.translations = {}
            }
        }
    }
})
