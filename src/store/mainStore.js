import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        menuOpen: false,
        navDropdownOpen: false,
        isLoggedIn: false,
        token: null,
        user: null,
        showLoginModal: false,

        snackbar: {
            visible: false,
            message: '',
            submessage: '',
            color: 'green'
        }
    }),

    getters: {
    },

    actions: {
        loginSuccess(token, user) {
            this.token = token;
            this.user = user;
            this.isLoggedIn = true;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },

        logout() {
            this.menuOpen = false
            this.navDropdownOpen = false
            this.token = null;
            this.user = null;
            this.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        loadFromStorage() {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (token && user) {
                this.token = token;
                this.user = JSON.parse(user);
                this.isLoggedIn = true;
            }
        },

        showSnackbar({ message, submessage = '', color = 'green', duration = 3000 }) {
            this.snackbar = { visible: true, message, submessage, color };
            setTimeout(() => {
                this.snackbar.visible = false;
            }, duration);
        }
    }
});
