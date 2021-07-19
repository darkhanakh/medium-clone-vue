<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand">
        Medium Clone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'home' }"
            active-class="active"
          >
            Home
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <!-- {name: 'editor'} -->
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active" exact>
              <i class="ion-compose" /> &nbsp; New Article
            </router-link>
          </li>
          <!-- {name: 'settings'} -->
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active">
              <i class="ion-gear-a" /> &nbsp; Settings
            </router-link>
          </li>
          <!-- {name: 'profile', params: { slug: currentUser.username }} -->
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active">
              <img :src="userImage" alt="user" class="user-pic" />
              &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>

        <template v-else-if="isAnonymous">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'login' }"
              active-class="active"
            >
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'register' }"
              active-class="active"
            >
              Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  CURRENT_USER as currentUser,
  IS_LOGGED_IN as isLoggedIn,
  IS_ANONYMOUS as isAnonymous,
} from '@/store/getterTypes';

export default {
  name: 'AppTheHeader',
  computed: {
    ...mapGetters({
      currentUser,
      isLoggedIn,
      isAnonymous,
    }),
    userImage() {
      return this.currentUser.image === null
        ? require('@/assets/icons/person-outline.svg')
        : this.currentUser.image;
    },
  },
};
</script>
