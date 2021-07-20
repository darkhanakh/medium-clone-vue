<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }"
              >Need an account?
            </router-link>
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
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/shared/ValidationErrors.vue';
import { mapGetters } from 'vuex';
import { LOGIN as login } from '@/store/types/actionTypes';
import {
  IS_SUBMITTING as isSubmitting,
  VALIDATION_ERRORS as validationErrors,
} from '@/store/types/getterTypes';

export default {
  name: 'AppLogin',
  components: {
    AppValidationErrors,
  },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async onSubmit() {
      const formData = { email: this.email, password: this.password };

      try {
        const user = await this.$store.dispatch(login, formData);
        console.log('user: ', user);
        this.$router.replace({ name: 'globalFeed' });
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    ...mapGetters({ isSubmitting, validationErrors }),
  },
};
</script>

<style scoped></style>
