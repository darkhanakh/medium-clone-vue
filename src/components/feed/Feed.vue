<template>
  <div v-if="isLoading">
    <grid-loader color="green"></grid-loader>
  </div>

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
    <app-pagination
      :total="feedData.articlesCount"
      :limit="limit"
      :base-url="baseUrl"
      :current-page="currentPage"
    ></app-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { stringify, parseUrl } from 'query-string';
import GridLoader from 'vue-spinner/src/GridLoader';

import AppPagination from './Pagination.vue';
import { constants } from '@/helpers';

export default {
  components: { AppPagination, GridLoader },
  name: 'AppFeed',
  data: () => ({
    limit: constants.LIMIT,
  }),
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions('feed', ['getFeed']),
    async fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedUrl = stringify({
        limit: this.limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedUrl}`;
      await this.getFeed({ apiUrl: apiUrlWithParams });
    },
  },
  computed: {
    ...mapGetters('feed', ['feedData', 'isLoading', 'error']),
    currentPage() {
      return +this.$route.query.page || 1;
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * this.limit - this.limit;
    },
  },
  watch: {
    async currentPage() {
      await this.fetchFeed();
    },
  },
  async mounted() {
    await this.fetchFeed();
  },
};
</script>
