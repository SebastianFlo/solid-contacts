<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
    max-width: 800px;
    margin: 0 auto;
}

body, input, button {
    font: 11pt/1.3 "Helvetiva Neue", Helvetica, Arial, sans-serif;
}

div {
    padding: 5px;
}

button, label {
    font-weight: bold;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#profile {
    width: 400px;
}
</style>
