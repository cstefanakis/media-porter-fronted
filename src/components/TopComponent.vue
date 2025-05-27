<script>
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'TopComponent'
});
</script>

<template>
  <div class="top-menu">
    <RouterLink class="top-menu-button" to="/sources">Sources</RouterLink>
    <RouterLink class="top-menu-button" to="/movies-menu">Movies</RouterLink>
    <RouterLink class="top-menu-button" to="/tv-shows-menu">TV Shows</RouterLink>
    <RouterLink class="top-menu-button" to="/music-menu">Music</RouterLink>
    <RouterLink class="top-menu-button" to="/photos-menu">Photos</RouterLink>
    <RouterLink class="top-menu-button" to="/ebooks-menu">e-Books</RouterLink>
  </div>
</template>

<style scoped>
  .top-menu {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .top-menu-button {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    color: white;
  }

  .top-menu-button:hover {
    background-color: #f0f0f0;
    color: black;
  }
</style>