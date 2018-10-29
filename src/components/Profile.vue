<template>
    <div id="profile">
        <label for="profile">Profile:</label>
        <input v-model="searchId" placeholder="Insert Url Here">
        <button @click="view(searchId)">View</button>

        <p>{{ user.name }}</p>

        <ul>
            <li v-for="friend in user.friends" :key="friend.id">
              <a href="#" @click="searchId=friend.id; view(friend.id)">{{ friend.name }}</a>
            </li>
          </ul>
    </div>
</template>

<script>
    // import * as solid from 'solid-auth-client';
    import * as $rdf from 'rdflib';
    import { SET_USER, UPDATE_USER } from '../data/types';

    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

    export default {
        name: 'Profile',
        data: function () {
            return {
                searchId: ''
            };
        },
        methods: {
            async view(personId) {
                // TODO View here
                // Set up a local data store and associated data fetcher
                const rdfStore = $rdf.graph();
                const fetcher = new $rdf.Fetcher(rdfStore);

                // // Load the person's data into the rdfStore
                await fetcher.load(personId);

                // // Display their details
                const user = rdfStore.any($rdf.sym(personId), FOAF('name'));

                this.$store.commit({
                    type: SET_USER,
                    user: {
                        name: user.value
                    }
                });

                const friends = rdfStore.each($rdf.sym(personId), FOAF('knows'));

                this.$store.commit({
                    type: UPDATE_USER,
                    user: {
                        ...this.user,
                        friends: []
                    }
                });

                friends.forEach(async (friend) => {
                    await fetcher.load(friend);

                    const fullName = rdfStore.any(friend, FOAF('name'));

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

                    // $('#friends').append(
                    //     $('<li>').append(
                    //         $('<a>').text(fullName && fullName.value || friend.value)
                    //             .click(() => profileEl.val(friend.value))
                    //             .click(loadProfile)
                    //     )
                    // )
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