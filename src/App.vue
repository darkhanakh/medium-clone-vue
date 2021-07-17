<template>
  <AppTheHeader />
  <router-view />
</template>

<script>
import AppTheHeader from '@/components/shared/TheHeader';

export default {
  name: 'App',
  components: { AppTheHeader },
};
</script>

<style src="./main.css" />
