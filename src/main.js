import Vue from 'vue'
import App from './App.vue'
import router from './router'

const $ = window['$'];
const $rdf = window['$rdf'];
const solid = window['solid'];

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

document.addEventListener('DOMContentLoaded', load);

function load() {
    const loginEl = $('#login');
    const loginButton = $('#login button')

    const logoutEl = $('#logout');
    const logoutButton = $('#logout #logout-b')

    const userEl = $('#user');
    const profileEl = $('#profile');
    const nameEl = $('#name');
    const viewButton = $('#view');

    const popupUri = 'popup.html';
    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

    init();
    setupSession();
    hookView();

    function init() {
        logoutEl.hide();
    }

    function setupSession() {
        loginButton.click(() => solid.auth.popupLogin({ popupUri }));
        logoutButton.click(() => solid.auth.logout());

        solid.auth.trackSession(session => {
            const loggedIn = !!session;

            loginEl.toggle(!loggedIn);
            logoutEl.toggle(loggedIn);

            if (loggedIn) {
                const sessionId = session.webId;
                userEl.text(sessionId);

                if (!profileEl.val()) {
                    profileEl.val(sessionId);
                }
            }
        });
    }

    function hookView() {
        viewButton.click(async function loadProfile() {
            // Set up a local data store and associated data fetcher
            const store = $rdf.graph();
            const fetcher = new $rdf.Fetcher(store);

            // Load the person's data into the store
            const person = profileEl.val();
            await fetcher.load(person);

            // Display their details
            const fullName = store.any($rdf.sym(person), FOAF('name'));
            nameEl.text(fullName && fullName.value);

            const friends = store.each($rdf.sym(person), FOAF('knows'));
            $('#friends').empty();
            friends.forEach(async (friend) => {
                await fetcher.load(friend);
                const fullName = store.any(friend, FOAF('name'));
                $('#friends').append(
                    $('<li>').append(
                        $('<a>').text(fullName && fullName.value || friend.value)
                                .click(() => profileEl.val(friend.value))
                                .click(loadProfile)
                        )
                )
            });
        });
    }
}
