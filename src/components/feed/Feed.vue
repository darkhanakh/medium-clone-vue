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
      :total="total"
      :limit="limit"
      :base-url="baseUrl"
      :current-page="currentPage"
    ></app-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppPagination from './Pagination.vue';
import GridLoader from 'vue-spinner/src/GridLoader';

export default {
  components: { AppPagination, GridLoader },
  name: 'AppFeed',
  data: () => ({
    total: 500,
    limit: 10,
    currentPage: 3,
    baseUrl: '/',
  }),
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
