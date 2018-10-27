<template>
    <div id="profile">
        <label for="profile">Profile:</label>
        <input v-model="searchId">
        <button @click="view(searchId)">View</button>

        <p>{{ user.name }}</p>
        <ul id="friends"></ul>
    </div>
</template>

<script>
    // import * as solid from 'solid-auth-client';
    import * as $rdf from 'rdflib';
    import { SET_USER } from '../data/types';

    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

    export default {
        name: 'Profile',
        data: function () {
            return {
                searchId: 'Insert Url Here'
            };
        },
        methods: {
            async view(personId) {
                // TODO View here
                // Set up a local data store and associated data fetcher
                const store = $rdf.graph();
                const fetcher = new $rdf.Fetcher(store);

                // // Load the person's data into the store
                await fetcher.load(personId);

                // // Display their details
                const fullName = store.any($rdf.sym(personId), FOAF('name'));

                this.$store.commit({
                    type: SET_USER,
                    user: {
                        name: fullName
                    }
                });

                // const friends = store.each($rdf.sym(person), FOAF('knows'));
                // $('#friends').empty();
                // friends.forEach(async (friend) => {
                //     await fetcher.load(friend);
                //     const fullName = store.any(friend, FOAF('name'));
                //     $('#friends').append(
                //         $('<li>').append(
                //             $('<a>').text(fullName && fullName.value || friend.value)
                //                 .click(() => profileEl.val(friend.value))
                //                 .click(loadProfile)
                //         )
                //     )
                // });
            }
        },
        computed: {
            user() {
                return this.$store.getters.user || {}
            }
        }
    }
</script>