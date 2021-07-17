<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">Have an account?</router-link>
          </p>
          <AppValidationErrors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/shared/ValidationErrors.vue';
import { mapGetters, mapActions } from 'vuex';
import { REGISTER as register } from '@/store/actionTypes';

export default {
  components: { AppValidationErrors },
  name: 'AppRegister',
  data() {
    return {
      email: '',
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({
      register,
    }),
    async onSubmit() {
      const formData = {
        email: this.email,
        username: this.username,
        password: this.password,
      };

      try {
        const user = await this.register(formData);
        console.log(user);
        this.$router.push({ name: 'home' });
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    ...mapGetters(['isSubmitting', 'validationErrors']),
  },
};
</script>

<style scoped></style>
