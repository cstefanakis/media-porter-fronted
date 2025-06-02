<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import MoviesListComponent from './MoviesListComponent.vue';

export default {
  components: {
    MoviesListComponent
  },
  setup() {

    const movies = ref([]);
    const sources = ref([]);
    const type = ref('');
    const sourcePath = ref('');
    const destinationPath = ref('');
    const page = ref(0);
    const size = ref(8);
    const totalPages = ref(0);
    const sort = ref('title,asc');
    const loading = ref(false);
    
    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/sources');
        sources.value = response.data;
      } catch (error) {
        console.error('Error fetching sources:', error);
      }
    });

    const submitPath = async () => {
      loading.value = true;
      try {
        const response = await axios.get('http://localhost:8080/api/movies/create-movies-from-path' , {
          params: { 
            path: sourcePath.value,
            page: page.value,
            size: size.value,
            sort: sort.value
          }
      });
        movies.value = response.data.content;
        totalPages.value = response.data.totalPages;
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        loading.value = false;
      }
    };

    const organizeMovies = async () => {
      try{
        const response = axios.post('http://localhost:8080/api/movies/organize-download-movies', null,
        {
          params: {
            sourcePath: sourcePath.value,
            destinationPath: destinationPath.value,
          }
        });
      }catch (error) {
        console.error('Error organizing movies:', error);
      }
    };
    
    const nextPage = () => {
      if (page.value < totalPages.value -1){
        page.value++;
      }
    }

    const prevPage = () => {
      if (page.value > 0){
        page.value--;
      }
    }

    return {
        movies,
        submitPath,
        getTitleAndYear,
        getAudios,
        getPoster,
        getRating,
        goToMovieDetails,
        sources,
        type,
        sourcePath,
        destinationPath,
        organizeMovies,
        nextPage,
        prevPage,
        page,
        size,
        totalPages,
        loading,
      };
  },
};

</script>

<template>
  <div>
    <h2>Create Movies From Path</h2>

    <form @submit.prevent="submitPath">
      <label for="sourcePath">Source: </label>
      <select v-model="sourcePath" required>
        <option value="" disabled>Select a type</option>
        <option v-for="source in sources" :key="source" :value="source.path">{{ source.title }}</option>
      </select>
        
      <button type="submit">Submit</button>
      
    </form>
    <div class="spinner" v-if="loading"></div>
    <MoviesListComponent :movies="movies" />
  </div>
        <div v-if ="page > 0">
          <button @click="prevPage()" :disabled="page === 0">Previous</button>
            <span>Page {{ page + 1 }} / {{ totalPages }}</span>
          <button @click="nextPage()" :disabled="page === totalPages - 1">Next</button>
        </div>

        <div v-if="page > 0">
          <h2>Organize Movies</h2>
          <form @submit.prevent="organizeMovies">
            <label for="destinationPath">Destination:</label>
            <select v-model="destinationPath" required>
              <option value="" disabled>Select a type</option>
              <option v-for="source in sources" :key="source" :value="source.path">{{ source.path }}</option>
            </select>
          
            <button type="submit">Submit</button>
          </form>
        </div>
  </template>

  <style scoped>
    
  </style>