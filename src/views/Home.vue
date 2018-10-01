<template>
    <div>
        <h1>Profile viewer</h1>

        <p id="login">
            You are not logged in.
            <button>Login</button>
        </p>

        <div id="logout">
            You are logged in as <b id="user"></b>.

            <div>
                <label for="profile">Profile:</label>
                <input id="profile">
                <button id="view">View</button>

                <p id="name"></p>
                <ul id="friends"></ul>
            </div>

            <div>
                <button id="logout-b">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Popup from '@/components/Popup.vue'

export default {
  name: 'home',
  components: {
    Popup
  }
}
</script>
