<template>
    <div id="profile">
        <label for="profile">Profile:</label>
        <input v-model="searchId" placeholder="Insert Url Here">
        <button :disabled="searchId.length < 1" @click="view(searchId)">View</button>

        <p>{{ user.name }}</p>

        <div v-if="loadingFriends">...</div>
        <ul>
            <li v-for="friend in user.friends"
                :key="friend.id">
                <a href="#"
                    @click="searchId=friend.id; view(friend.id)">{{ friend.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import * as $rdf from 'rdflib';

    import { SET_USER, UPDATE_USER } from '../state/types';

    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

    export default {
        name: 'Profile',
        data: function () {
            return {
                searchId: '',
                loadingFriends: false
            };
        },
        methods: {
            async view(personId) {
                const trimmedPersonId = personId.trim();
                // TODO View here
                // Set up a local data store and associated data fetcher
                const rdfStore = $rdf.graph();
                const fetcher = new $rdf.Fetcher(rdfStore);

                // // Load the person's data into the rdfStore
                await fetcher.load(trimmedPersonId);

                // // Display their details
                const user = rdfStore.any($rdf.sym(trimmedPersonId), FOAF('name'));

                if (!user) {
                    return;
                }

                this.$store.commit({
                    type: SET_USER,
                    user: {
                        name: user.value
                    }
                });

                const friends = rdfStore.each($rdf.sym(trimmedPersonId), FOAF('knows'));

                this.$store.commit({
                    type: UPDATE_USER,
                    user: {
                        ...this.user,
                        friends: []
                    }
                });

                friends.forEach(async (friend) => {
                    this.loadingFriends = true;
                    await fetcher.load(friend);

                    const fullName = rdfStore.any(friend, FOAF('name'));

                    if (!fullName) {
                        return;
                    }

                    this.$store.commit({
                        type: UPDATE_USER,
                        user: {
                            friends: [
                                ...this.user.friends,
                                {
                                    name: fullName && fullName.value,
                                    id: friend.value
                                }
                            ]
                        }
                    });

                    this.loadingFriends = false;
                });


            }
        },
        computed: {
            user() {
                return this.$store.getters.user || {}
            }
        }
    }
</script>

<style lang="scss">
    #profile {
        width: 400px;
        border: 1px solid black;
    }
</style>