<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <AppFeed :api-url="apiUrl"></AppFeed>
        </div>
        <div class="col-md-3">POPULAR TAGS</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from '@/components/shared/Feed.vue';

export default {
  name: 'AppGlobalFeed',
  components: { AppFeed },
  data: () => ({
    apiUrl: '/articles',
  }),
};
</script>
