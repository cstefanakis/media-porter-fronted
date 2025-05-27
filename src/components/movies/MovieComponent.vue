<script>
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import rateIcon from '../../assets/rateIcon.png';

export default {
  setup() {
    const movies = ref([]);
    const page = ref(0);
    const size = ref(10);
    const totalPages = ref(0);
    const loading = ref(false);

    onMounted(async () => {
      getMovies();
    });
    
    const getMovies = async () => {
      loading.value = true;
      try {
        const response = await axios.get('http://localhost:8080/api/movies?page='+ page.value +'&size='+ size.value +'&sort=title,asc');
        movies.value = response.data.content;
        totalPages.value = response.data.totalPages;
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        loading.value = false;
      }
    }

    watch(page, getMovies);

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

    const getLanguageCode = (audio) => {
      return audio?.language?.iso6391 || null;
    }

    const getVideoCodec = (movie) => {
      return movie.video?.codec?.name || null;
    }

    const getSubtitleLanguage = (subtitle) => {
      return subtitle.language?.englishTitle || null;
    }

    const getPoster = (movie) => {
      return movie.poster || null;;
    }

    const getRating = (movie) => {
      return movie.rating || null;
    }

    return {
      movies,
      page,
      size,
      totalPages,
      nextPage,
      prevPage,
      getMovies,
      loading,
      getLanguageCode,
      getVideoCodec,
      getSubtitleLanguage,
      getPoster,
      getRating,
      rateIcon
    };
},
};
  
</script>

<template>
    <h2>Movies</h2>
    <div v-if="loading" class = "spinner"></div>
    <div v-if="!loading">
    
  
      <div v-if="movies.length === 0">No movies found.</div>
      <div v-else>
        <div v-if="movies.length > 0">
          
        <div class="movie-list">
            <div class = "movie-card" v-for="movie in movies" :key="movie.id">
                <router-link :to="`/movies/`+ movie.id">

                    <div class="title">{{ movie.title }} <span>{{ movie.year }}</span> <span>{{ movie.id }}</span></div>
        
                    <img class="poster" :src="getPoster(movie)" alt="Movie Poster" />

                    <div class = "video-codec">{{ getVideoCodec(movie) }}</div>
                    <div>
                        <div v-for="audio in movie.audios" :key="audio.id">
                            <div>{{ getLanguageCode(audio)}}</div>
                        </div>
                    </div>

                    <div>
                        <div v-for="subtitle in movie.subtitles" :key="subtitle.id">
                            <div>{{ getSubtitleLanguage(subtitle) }}</div>
                        </div>
                    </div>
                
                    <div> <img class = "rate-img" :src ="rateIcon">{{ getRating(movie) }}</div>
                </router-link>
            </div>
          </div>
          <button @click="prevPage()" :disabled="page === 0">Previous</button>
          <div>{{ page + " / " + totalPages }}</div>
          <button @click="nextPage()" :disabled="page === totalPages - 1">Next</button>
        </div>
    </div>
    </div>
  </template>

<style>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.movie-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 120px;
    text-align: center;
}

.title {
  font-weight: bold;
  margin-bottom: 5px;
}

.rating {
    border: 1px solid #ccc;
    border-radius: 5px;
    width:100px;
    background-color: #f39c12;
    color: black;
}

.genre {
    display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.rate-img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.poster {
  width: 120px;
  object-fit: cover;
}
</style>