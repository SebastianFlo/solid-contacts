<template>
    <div id="login">
        You are not logged in.
        <button @click="login">Login</button>
    </div>
</template>

<script>
    import * as solidAuth from 'solid-auth-client';

    export default {
        name: 'Login',
        data: function () {
            return {
                popupUri: 'https://solid.community/common/popup.html'
            };
        },
        methods: {
            login() {
                solidAuth.popupLogin({ popupUri: this.popupUri });
            }
        }
    }
</script>