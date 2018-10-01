<template>
    <div id="profile">
        <label for="profile">Profile:</label>
        <input :value="user.id">
        <button @click="view(user.id)">View</button>

        <p>{{ user.name }}</p>
        <ul id="friends"></ul>
    </div>
</template>

<script>
    import * as solid from 'solid-auth-client';

    export default {
        name: 'Profile',
        data: function () {
            return {
            };
        },
        methods: {
            view(id) {
                // TODO View here
            }
        },
        computed: {
            user() {
                return this.$store.getters.user || {}
            }
        }
    }
</script>