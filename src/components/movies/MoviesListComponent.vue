<script>
import rateIcon from '../../assets/rateIcon.png';
export default {
  props: {
    movies: {
      type: Array,
      required: true
    }
  },

  setup() {
    const getTitleAndYear = (movie) => {
      const year = movie.year ? movie.year : null;
      if (year === null) {
        return movie.title;
      }
      return movie.title + " " + movie.year;
    };

    const goToMovieDetails = (movie) => {
      return "/movies/" + movie.id || [];
    };

    const getLanguageCode = (audio) => {
      return audio?.language?.iso6391 || null;
    };

    const getVideoCodec = (movie) => {
      return movie.video?.codec?.name || null;
    };

    const getSubtitleLanguage = (subtitle) => {
      return subtitle.language?.englishTitle || null;
    };

    const getPoster = (movie) => {
      return movie.poster || null;
    };

    const getRating = (movie) => {
      return movie.rating || null;
    };

    return {
      
      getLanguageCode,
      getTitleAndYear,
      goToMovieDetails,
      getVideoCodec,
      getSubtitleLanguage,
      getPoster,
      getRating,
      rateIcon
    };
  }
};
</script>


<template>
    <div v-if="movies.length === 0">
        <p>No movies available.</p>
        </div>
        <div v-else>
            
            
    <div class="movie-list">
            <div v-for="movie in movies" :key="movie.id">
                <router-link :to="goToMovieDetails(movie)">
                  <div class="movie-card">

                    <div class = "title">{{ getTitleAndYear(movie) }}</div>
        
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
                    </div>
                </router-link>
            </div>
        </div>
        <div v-if ="page > 0">
            <button @click="prevPage()" :disabled="page === 0">Previous</button>
            <div>{{ page + " / " + totalPages }}</div>
            <button @click="nextPage()" :disabled="page === totalPages - 1">Next</button>
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

.rate {
  width: 20px;
}
</style>