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
    const modifyLoading = ref(false);

    const countries = ref([]);
    const audios = ref([]);
    const subtitles = ref([]);
    const genres = ref([]);

    const title = ref(null);
    const year = ref(null);
    const rating = ref(null);
    const country = ref(null);
    const director = ref(null);
    const actor = ref(null);
    const genre = ref(null);
    const audio = ref(null);
    const writer = ref(null);
    const subtitle = ref(null);

    const advancedFilter = ref(false);
    const formItem = ref('hidden');
    const formStyle = ref('filter')

    onMounted(async () => {
      filterMovies();
      
    });
    

    const filterMovies = async () => {
      loading.value = true;

      const filterRequest = {
      title : title.value,
      year : year.value,
      rating : rating.value,
      country : country.value,
      director : director.value,
      actor : actor.value,
      genre : genre.value,
      audio : audio.value,
      writer : writer.value,
      subtitle : subtitle.value,
    }
      try {
        const response = await axios.post('http://localhost:8080/api/movies/filter-movies', filterRequest);
        movies.value = [];
        movies.value = response.data.content;
      } catch (error) {
        console.error('Error filtering movies:', error);
      } finally {
        cleanFilterArrays();
        getData();
        loading.value = false;
      }
    }

    watch(page, filterMovies);

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

    const cleanFilterArrays = () => {
      countries.value = [];
      audios.value = [];
      subtitles.value = [];
      genres.value = [];
    }

    const advancedFilterOn = () => {
      if (advancedFilter.value) {
        advancedFilter.value = false;
        formItem.value = 'hidden';
        formStyle.value = 'filter';
      } else {
        advancedFilter.value = true;
        formItem.value = 'form-item';
        formStyle.value = 'advanced-filter';
      }
    }

    const getTitleAndYear = (movie) => {
      const year = movie.year ? movie.year : null;
      if (year === null) {
          return movie.title;
      }
      return movie.title + " " + movie.year;
    }

    const goToMovieDetails = (movie) => {
      return "/movies/" + movie.id || [];
    };


    const getData = () => {

      for(const movie of movies.value) {
          countries.value.push(movie.country);
    

        if (movie.audios) {
          for (const audio of movie.audios) {
            if(!audios.value.some(a => a.id === audio.language.id)){
              audios.value.push(audio.language);
            }
              
          }
        }

        // if (movie.subtitles) {
        //   for (const sub of movie.subtitles) {
        //     if(sub.language !== nul){
        //       if(!subtitles.value.some(s => s?.id === sub?.language?.id)) {
        //         subtitles.value.push(sub.language);
        //       }
        //     }
        //   }
        // }

        if (movie.genres){
          for (const genre of movie.genres) {
            if(!genres.value.some(g => g.id === genre.id)) {
            genres.value.push(genre);
            }
          }
        }
      }
    }
    

    return {
      movies,
      page,
      size,
      totalPages,
      nextPage,
      prevPage,
      loading,
      modifyLoading,
      getLanguageCode,
      getVideoCodec,
      getSubtitleLanguage,
      getPoster,
      getRating,
      rateIcon,
      filterMovies,
      getTitleAndYear,
      goToMovieDetails,

      getData,
      countries,
      audios,
      subtitles,
      genres,

      title,
      year,
      rating,
      country,
      director,
      actor,
      genre,
      audio,
      writer,
      subtitle,

      advancedFilterOn,
      formItem,
      formStyle
    };
},
};
  
</script>

<template>

  
    <form :class = "formStyle" @submit.prevent="filterMovies">
      <table>
        <thead>
          <tr>
            <th colspan="2">Filter Movies</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><label for="title">Title:</label></td>
            <td><input  class="title" type="text" v-model="title" /></td>
          </tr>
        </tbody>
      </table>
      
      <table :class = "formItem">
        
        <tbody>
          
          <tr>
            <td><label for="year">Year:</label></td>
            <td><input class = "year" type="text" v-model="year" /></td>
          </tr>

          <tr>
            <td><label for="rating">Rating:</label></td>
            <td><input class = "rate" type="text" v-model="rating" /></td>
          </tr>

          <tr>
            <td><label for="country">Country: </label></td>
            <td>
              <select v-model="country" >
                <option :value = null >Select a type</option>
                <option v-for="country in countries" :key="country.id" :value="country">{{ country }}</option>
              </select>
            </td>
          </tr>

          <tr>
            <td><label for="director">Director:</label></td>
            <td><input type="text" v-model="director" /></td>
          </tr>

          <tr>
            <td><label for="actor">Actor:</label></td>
            <td><input type="text" v-model="actor" /></td>
          </tr>

          <tr>
            <td><label for="genre">Genre:</label></td>
            <td>
              <select v-model="genre" >
                <option :value= null >Select a type</option>
                <option v-for="genre in genres" :key="genre.id" :value="genre">{{ genre.title }}</option>
              </select>
            </td>
          </tr>

          <tr>
            <td><label for="audio">Audios:</label></td>
            <td>
              <select v-model="audio" >
                <option :value= null >Select a type</option>
                <option v-for="audio in audios" :key="audio.id" :value="audio">{{ audio.englishTitle }}</option>
              </select>
            </td>
          </tr>
      
          <tr>
            <td><label for="writer">Writer:</label></td>
            <td><input type="text" v-model="writer" /></td>
          </tr>
          
        </tbody>
      </table>
        
      
      <!-- <div>
        <label for="subtitle">Subtitles: {{ subtitles.length }}</label>
        <select v-model="subtitle" >
          <option value= null >Select a type</option>
          <option v-for="subtitle in subtitles" :key="subtitle.id" :value="subtitle">{{ subtitle.englishTitle }}</option>
        </select>
      </div> -->

        <button type="submit">Filter</button>
        <div v-if="loading" class = "spinner"></div>
    <button @click="advancedFilterOn">Advanced Filter</button>
    </form>
   
    
    
    <div v-if="movies.length === 0">No movies found.</div>
      <div v-else>
        <div v-if="movies.length > 0">
          
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

.advanced-filter {
  display: flex;
  flex-direction:column;
  gap: 10px;
  margin-bottom: 20px;
  position: absolute;
  background-color: black;
  text-align: left;
}

.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  text-align: left;
}

.form-item {
  display: flex;
  flex-direction:wrap;
  margin-right: 10px;
  text-align: left;
}

.rate {
  width: 20px;
}
</style>