<template>
  <AppTheHeader />
  <router-view />
</template>

<script>
import AppTheHeader from '@/components/shared/TheHeader';
import { GET_CURRENT_USER as getCurrentUser } from '@/store/types/actionTypes';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: { AppTheHeader },
  methods: {
    ...mapActions({
      getCurrentUser,
    }),
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>

<style src="./main.css" />
