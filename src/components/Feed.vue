<template>
  <div v-if="isLoading">Loading...</div>

  <div v-if="error">Something went wrong</div>

  <div v-if="feedData">
    <div
      class="article-preview"
      v-for="(article, index) in feedData.articles"
      :key="index"
    >
      <div class="article-meta">
        <router-link
          :to="{
            name: 'userProfile',
            params: { slug: article.author.username },
          }"
        >
          <img :src="article.author.image" alt="user" />
        </router-link>
        <div class="info">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
            class="author"
          >
            {{ article.author.username }}
          </router-link>
          <span class="date">{{ article.createdAt }}</span>
        </div>
        <div class="pull-xs-right">ADD TO FAVORITES</div>
      </div>
      <router-link
        :to="{ name: 'article', params: { slug: article.slug } }"
        class="preview-link"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        TAG LIST
      </router-link>
    </div>
    PAGINATION
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters('feed', ['feedData', 'isLoading', 'error']),
  },
  async mounted() {
    await this.getFeed({ apiUrl: this.apiUrl });
  },
};
</script>
