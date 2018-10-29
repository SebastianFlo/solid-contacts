<template>
    <div id="logout">
        You are logged in as <b>{{ sessionUser || 'unknown' }}</b>.
        <div>
            <button @click="logout">Logout</button>
        </div>
    </div>
</template>

<script>
    import * as solid from 'solid-auth-client';

    export default {
        name: 'Logout',
        data: function () {
            return {
            };
        },
        methods: {
            logout() {
                if (!solid) {
                    return;
                }
                solid.auth.logout();
            }
        },
        computed: {
            sessionUser: function () {
                return this.$store.getters.session && this.$store.getters.session.webId;
            }
        }
    }
</script>