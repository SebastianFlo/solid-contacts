<template>
    <div id="logout">
        You are logged in as <b>{{ sessionUser || 'unknown' }}</b>.
        <div>
            <button @click="logout">Logout</button>
        </div>
    </div>
</template>

<script>
    // import * as solidAuth from 'solid-auth-client';

    export default {
        name: 'Logout',
        data: function () {
            return {
            };
        },
        methods: {
            logout() {
                solidAuth.logout();
            }
        },
        computed: {
            sessionUser: function () {
                return this.$store.getters.session && this.$store.getters.session.webId;
            }
        }
    }
</script>

<style lang="scss">
    #logout {
        border: 1px solid cornflowerblue;
    }
</style>
