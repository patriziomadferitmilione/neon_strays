<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <!-- Email -->
      <div class="form__group field">
        <input v-model="email" type="email" class="form__field" placeholder="Email" name="email" id='email' required />
        <label for="email" class="form__label">Email</label>
      </div>
      <div class="form__group field">
        <!-- Password -->
        <input v-model="password" type="password" class="form__field" placeholder="Password" name="password" id='password' required />
        <label for="password" class="form__label">Password</label>
      </div>

      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { useMainStore } from '../store/mainStore';

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');

        const payload = JSON.parse(atob(data.token.split('.')[1]));
        this.store.loginSuccess(data.token, payload);
        this.store.showLoginModal = false;
      } catch (err) {
        this.error = err.message;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 3rem;
    color: var(--grey);
  }

  form {
    width: 70%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    .form__group {
      position: relative;
      padding: 15px 0 0;
      margin-top: 10px;
      width: 100%;
    }
    .form__field {
      font-family: inherit;
      width: 100%;
      border: 0;
      border-bottom: 2px solid var(--grey);
      outline: 0;
      font-size: 1.3rem;
      color: var(--white);
      padding: 7px 0;
      background: transparent;
      transition: border-color 0.2s;

      &::placeholder {
        color: transparent;
      }

      &:placeholder-shown ~ .form__label {
        font-size: 1.3rem;
        cursor: text;
        top: 20px;
      }
    }

    .form__label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: var(--grey);
    }

    .form__field:focus {
      ~ .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: var(--green3);
        font-weight:700;
      }
      padding-bottom: 6px;
      font-weight: 700;
      border-width: 3px;
      border-image: linear-gradient(to right, var(--blue2), var(--green2));
      border-image-slice: 1;
    }
    /* reset input */
    .form__field{
      &:required,&:invalid { box-shadow:none; }
    }

    button {
      width: 80%;
    }

    .error {
      color: var(--red3);
      margin-top: 0.5rem;
    }
  }
}

</style>
