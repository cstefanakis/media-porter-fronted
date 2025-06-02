<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import rateIcon from '../../assets/rateIcon.png';

export default {
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

        const getPoster = (movie) => {
            return movie.poster || null;
        }

        const getAudios = (movie) => {
            return movie.audios || [];
        }

        const goToMovieDetails = (movie) => {
            return "/movies/" + movie.id || [];
        };

        const getTitleAndYear = (movie) => {
            const year = movie.year ? movie.year : null;
            if (year === null) {
                return movie.title;
            }
            return movie.title + " " + movie.year;
        }

        const getRating = (movie) => {
            return movie.rating || null;
        };

        return {
            lastFiveMovies,
            topFiveMovies,
            loading,
            limit,
            getTitleAndYear,
            getPoster,
            getAudios,
            goToMovieDetails,
            getRating,
            rateIcon
        };
    }
}
</script>

<template>
    <div>
        <h2>Last Five Added Movies</h2>
        <div class = "movie-list">
            <div v-if="loading" class="spinner"></div>
            <div v-for="movie in lastFiveMovies" :key="movie.id" class="movie-item">
                <router-link :to="goToMovieDetails(movie)">
                    <div class="movie-card">
                        <div>{{ getTitleAndYear(movie)}}</div>
                        <img class="poster" :src="getPoster(movie)"/>
                        <div v-for="audio in getAudios(movie)" :key="audio.id">
                            <div>{{ audio.language?.englishTitle }}</div>
                        </div>
                        <div v-if="getRating(movie)">
                            <img class="rate-icon" :src="rateIcon" alt="Rate Icon"/>
                            <span>{{ getRating(movie) }}</span>
                        </div> 
                    </div>
                </router-link> 
            </div>
        </div> 
        
        <h2>Top five movies</h2>
        <div class = "movie-list">
            <div v-for="movie in topFiveMovies" :key="movie.id" class="movie-item">
                <router-link :to="goToMovieDetails(movie)">
                    <div class="movie-card">
                        <div>{{ getTitleAndYear(movie)}}</div>
                        <img class="poster" :src="getPoster(movie)"/>
                        <div v-for="audio in getAudios(movie)" :key="audio.id">
                            <div>{{ audio.language?.englishTitle }}</div>
                        </div>
                        <div v-if="getRating(movie)">
                            <img class="rate-icon" :src="rateIcon" alt="Rate Icon"/>
                            <span>{{ getRating(movie) }}</span>
                        </div> 
                    </div> 
                </router-link> 
            </div>
        </div>
    

        
    </div>
</template>