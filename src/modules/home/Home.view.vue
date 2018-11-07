<template>
    <div>
        <h1>Solid App</h1>

        <Login v-if="!loggedIn"></Login>

        <router-link v-if="loggedIn" to="/profile">Profile Viewer</router-link>
    </div>
</template>

<script>
import Login from '@/modules/core/login/Login.component.vue';

export default {
  name: 'home',
  components: {
    Login
  },
  computed: {
    loggedIn () {
        return this.$store.getters.loggedIn;
    }
  }
}
</script>
