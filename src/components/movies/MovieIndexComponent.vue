<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MoviesListComponent from './MoviesListComponent.vue';

export default {
    components: {
        MoviesListComponent
    },
    setup() {
        const lastFiveMovies = ref([]);
        const topFiveMovies = ref([]);
        const loading = ref(false);
        const limit = ref(5);

        onMounted(async () => {
            loading.value = true;
            try{
                const responseAddedMovies = await axios.get('http://localhost:8080/api/movies/get-last-five-added-movies', {
                    params: {
                        page: 0,
                        size: limit.value
                    }
                });

                const responseTopFive = await axios.get('http://localhost:8080/api/movies/get-top-five-movies', {
                    params: {
                        page: 0,
                        size: limit.value
                    }
                });
                topFiveMovies.value = responseTopFive.data;
                lastFiveMovies.value = responseAddedMovies.data;
            }catch (error){
                console.error('Error fetching last five movies:', error);
            } finally {
                loading.value = false;
            }
        });

        return {
            lastFiveMovies,
            topFiveMovies,
            loading,
            limit,
        };
    }
}
</script>

<template>
    <div>
        <h2>Last Five Added Movies</h2>
        <MoviesListComponent :movies="lastFiveMovies"/>
        
        <h2>Top five movies</h2>
        <MoviesListComponent :movies="topFiveMovies"/>
        
    </div>
</template>