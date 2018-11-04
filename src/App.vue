<template>
    <div id="app">
        <router-link to="/">
            Home
        </router-link>

        <Logout v-if="loggedIn"></Logout>

        <router-view/>
    </div>
</template>

<script>
    import * as solidAuth from 'solid-auth-client';

    import Logout from '@/modules/core/logout/Logout.component.vue';
    import { SET_SESSION } from '@/state/types';

    export default {
        name: 'App',

        components: {
            Logout
        },
        mounted: function () {
            this.trackSession();
        },
        methods: {
            trackSession() {
                solidAuth.trackSession(session => {
                    this.$store.commit({
                        type: SET_SESSION,
                        session
                    });
                });
            }
        },
        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn
            }
        },
    }
</script>

<style lang="scss">
    body {
        max-width: 800px;
        margin: 0 auto;
    }

    body,
    input,
    button {
        font: 11pt/1.3 "Helvetiva Neue", Helvetica, Arial, sans-serif;
    }

    div {
        padding: 5px;
    }

    button,
    label {
        font-weight: bold;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        border: 1px solid blueviolet;
    }
</style>