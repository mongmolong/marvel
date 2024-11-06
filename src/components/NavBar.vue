<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/search">Search</router-link>
    <router-link to="/random">Random</router-link>
  </nav>
</template>
  
<script >
export default {
  name: "NavbarComponent",
};
</script>
  
<style>
nav {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}
a {
  text-decoration: none;
  color: white;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 15px;
  transition: all 0.3s;
  box-sizing: border-box;

  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 10%,
    rgb(100, 96, 96) 50%,
    rgba(255, 255, 255, 0) 90%
  );
  backdrop-filter: blur(15px);
}
a:hover {
  color: black;
}
</style>