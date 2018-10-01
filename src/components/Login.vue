<template>
    <div id="login">
        You are not logged in.
        <button @click="login">Login</button>
    </div>
</template>

<script>
    import * as solid from 'solid-auth-client';

    export default {
        name: 'Login',
        data: function () {
            return {
                popupUri: 'https://solid.community/common/popup.html'
            };
        },
        methods: {
            login() {
                if (!solid) {
                    return;
                }
                solid.auth.popupLogin({ popupUri: this.popupUri });
            }
        }
    }
</script>