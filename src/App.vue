<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="content">
    <RouterView />
  <footer>
    <nav>
      <RouterLink to="/">Clients</RouterLink>
      <RouterLink to="/devis">Devis</RouterLink>
    </nav>
  </footer>
  </div>
</template>

<style scoped>
.content {
  min-height: calc(100vh - 50px); /* Adjust based on footer height */
  padding: 20px;
  background-color: #1c0833;
  color: #ffffff;
}

footer {
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  align-items: center;
  height: 50px; /* Adjust as needed */
  background-color: #1c0833;
  padding-left: 20px; /* Add padding to the left */
}

nav {
  display: flex;
  width: 100%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>