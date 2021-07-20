<template>
  <div>Feed</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppFeed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions('feed', ['getFeed']),
  },
  async mounted() {
    await this.getFeed({ apiUrl: this.apiUrl });
  },
};
</script>
