<template>
    <div>
        <h1>Profile viewer</h1>

        <Login v-if="!loggedIn"></Login>

        <Profile v-if="loggedIn"></Profile>
    </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Profile from '@/components/Profile.vue';

export default {
  name: 'home',
  components: {
    Login,
    Profile
  },
  computed: {
    loggedIn () {
        return this.$store.getters.loggedIn
    }
  }
}
</script>
