<template>
  <nav>
    <h1><nuxt-link to="/" class="log">Task Manager</nuxt-link></h1>
    <ul>
      <li><nuxt-link to="/">Add</nuxt-link></li>
      <li><nuxt-link to="/task">Task</nuxt-link></li>
      <li><nuxt-link to="/aplikacja">App</nuxt-link></li>
      <li><nuxt-link to="/server">Servers</nuxt-link></li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
nav {
  background-color: #222;
  padding: 10px;
  box-shadow: 0 0 20px rgba(228, 226, 226, 0.61);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
  position: relative;
}

h1 {
  font-size: 1.5em;
  margin-right: auto;
  padding-left: 5vw;
}

nav ul {
  display: flex;
  width: 60%;
  justify-content: space-around;
  list-style: none;
}

nav ul li {
  padding: 10px;
  width: 10%;
}

nav ul li a {
  font-size: 1.3em;
  text-transform: uppercase;
}

a {
  text-decoration: none;
}

.log {
  color: #27d !important;
}
</style>
