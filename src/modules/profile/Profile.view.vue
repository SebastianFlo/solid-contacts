<template>
    <div id="profile-view">
        <div class="profile-view-title">
            <h1>Profile viewer</h1>
        </div>

        <ProfileComponent :initSearchId="$route.params.id" class="profile-component"></ProfileComponent>
    </div>
</template>

<script>
    import ProfileComponent from './Profile.component.vue';

    export default {
        name: 'profile',
        components: {
            ProfileComponent
        },
        '$route.params.id': function (id) {
            // eslint-disable-next-line
            console.log('id', id);
        }
    }
</script>

<style lang="scss">
    #profile-view {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .profile-view-title {
        display: flex;
        width: 200px;
    }

    .profile-component {
        max-width: 50%;
    }
</style>