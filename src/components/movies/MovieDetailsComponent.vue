<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();
    const id = route.params.id;
    const title = ref('');
    const year = ref(null);
    const destinationPath = ref('');
    const sources = ref([]);
    const loading = ref(false);
    const renameForm = ref('hidden');
    const copyForm = ref('hidden');
    const moveForm = ref('hidden');
    const deleteForm = ref('hidden');
  
  onMounted(async () => {
    loading.value = true;
      try {
        const response = await axios.get('http://localhost:8080/api/movies/'+id);
        movie.value = response.data;
        const sourcesResponse = await axios.get('http://localhost:8080/api/sources');
        sources.value = sourcesResponse.data;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }finally {
        loading.value = false;
      }
    });

    const renameMovie = async () => {
      try{
        const response = await axios.put('http://localhost:8080/api/movies/'+id, {},{
          params: {
            title: title.value,
            year: year.value
          }
        });
        movie.value = response.data;
      }catch (error) {
          console.error('Error renaming movie:', error);
      }
      };

    const moveMovie = async () => {
      try{
        const response = await axios.put('http://localhost:8080/api/movies/move/' +id, null,{
          params: {
            path: destinationPath.value,
          }
        });
        movie.value = response.data;
      }catch (error) {
          console.error('Error moving movie:', error);
      }
    }

    const copyMovie = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/movies/copy/' +id, null,{
          params: {
            path: destinationPath.value,
          }
          });
      } catch (error) {
          console.error('Error copying movie:', error);
      }
    }

    const deleteMovie = async () => {
      try {
        const response = await axios.delete('http://localhost:8080/api/movies/' +id,{
          });
      } catch (error) {
          console.error('Error copying movie:', error);
      }
    }

    const getVideoCodec = () => {
      return movie.value?.video?.codec?.name || null;
    };

    const getVideoResolution = () => {
      return movie.value?.video?.resolution || null;
    };

    const getVideoBitrate = () => {
      return Math.floor(movie.value?.video?.bitrate /1000) + " kbps" || null;
    };

    const getAudioLanguage = (audio) => {
      return audio.language?.englishTitle || null;
    };

    const getAudioChannels = (audio) => {
      return audio?.channels + " Ch" || null;
    };

    const getAudioCodec = (audio) => {
      return audio.codec?.name || null;
    };

    const getAudioBitrate = (audio) => {
      return Math.floor(audio?.bitrate / 1000) + " kbps" || null;
    };

    const getActors = () => {
      return movie.value?.actors || null;
    };

    const getWriters = () => {
      return movie.value?.writers || null;
    };

    const getDirectors = () => {
      return movie.value?.directors || null;
    };

    const getGenres = () => {
      return movie.value?.genres || null;
    };

    const getAudios = () => {
      return movie.value?.audios || null;
    };

    const getSubtitles = () => {
      return movie.value?.subtitles || null;
    };

    const getPath = () => {
      return movie.value?.path || 'Unknown';
    };

    const getPoster = () => {
      return movie.value?.poster || null;
    };

    const getRating = () => {
      return movie.value?.rating || null;
    };

    const ratingImg = () =>{
      return "https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
    }

    const getTitleAndYear = () => {
      return movie.value.year != null
        ? movie.value.title + " " + movie.value.year
        : movie.value.title;
    }

    const sourcePaths = () => {
      const result = [];
      for (const source of sources.value) {
        if (source.type === 'MOVIE') {
          result.push(source);
        }
      }
      return result;
    };

    const forms = [renameForm, copyForm, moveForm, deleteForm];

const showForm = (form) => {
    forms.forEach(f => {
      f.value = 'hidden';
      });
      if (form === 'renameForm'){
        renameForm.value = 'form';
      } else if (form === 'copyForm') {
        copyForm.value = 'form';
      } else if (form === 'moveForm') {
        moveForm.value = 'form';
      } else if (form === 'deleteForm') {
        deleteForm.value = 'form';
      }
    };

    const closeForm = () => {
      renameForm.value = 'hidden';
      copyForm.value = 'hidden';
      moveForm.value = 'hidden';
      deleteForm.value = 'hidden';
    }

    return {
      movie,
      id,
      getVideoCodec,
      getVideoResolution,
      getVideoBitrate,
      getAudioLanguage,
      getAudioChannels,
      getAudioCodec,
      getAudioBitrate,
      getActors,
      getWriters,
      getDirectors,
      getAudios,
      getSubtitles,
      getGenres,
      getPath,
      getPoster,
      getRating,
      getTitleAndYear,
      renameMovie,
      title,
      year,
      destinationPath,
      moveMovie,
      copyMovie,
      deleteMovie,
      sources,
      loading,
      ratingImg,
      renameForm,
      copyForm,
      moveForm,
      deleteForm,
      closeForm,
      showForm,
      sourcePaths
    };
  }
};
</script>
  
  <template>
    <div v-if="loading" class="spinner"></div>
    <div v-if="!loading && movie">
      <h1>Movie Details</h1>
      <div>
        <div class = "title">
          <h2>{{ getTitleAndYear() }}</h2>
          <div class = rating> Rate:  <img class = "rate-img" :src = "ratingImg()"> {{ getRating() }}</div>
        </div>
        <div class = "genres">
          <div class = "genre" v-for="genre in getGenres()" :key="genre.id"> {{ genre.title }} </div>
        </div>
      </div>

      <div class = "modifications">
          <div class="button" @click="showForm('copyForm')">Copy Movie</div>
          <div class="button" @click="showForm('moveForm')">Move Movie</div>
          <div class="button" @click="showForm('renameForm')">Rename Movie</div>
          <div class="delete-button" @click="showForm('deleteForm')">Delete Movie</div>
      </div>

      <div class = "movie">
        <img class = "poster" :src="getPoster()" alt="Movie Poster" />
          
        <div class = "content-movie-details">
            
          <div class = "description">{{ movie?.plot || 'No Plot avilable' }}</div>
          
          <div class="contributors">Directors: 
            <div v-for="director in getDirectors()" :key="director.id">
              <div>{{ director.fullName }}</div>
            </div>
          </div>

          <div class="contributors">Writers: 
          <div v-for="writer in getWriters()" :key="writer.id">
            <div>{{ writer.fullName }}</div>
          </div>
          </div>

          <div class="contributors">Actors: 
            <div class="person" v-for="actor in getActors()" :key="actor.id">
              <div >
                <div v-if="actor.poster">
                  <img class = "contributor-post" :src="actor.poster" alt="Actor Photo" />
                </div>
                <div>{{ actor.fullName }}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class = "video-details"> Video: 
        <div class ="video" v-if="getVideoCodec() !== null">{{ getVideoCodec() }}</div>
        <div class ="video" v-if="getVideoResolution() !== null"> {{ getVideoResolution() }}</div>
        <div class = "video" v-if="getVideoBitrate() !== null" > {{ getVideoBitrate() }} </div>
      </div>
          
      <div class="audio-details"> Audio: 
        <div class = "audio-detail" v-for="audio in getAudios()" :key="audio.id">
          <div class = "audio"> {{ getAudioLanguage(audio) }}</div>
          <div class = "audio">{{ getAudioChannels(audio) }}</div>
          <div class = "audio">{{ getAudioCodec(audio)}}</div>
          <div class = "audio"> {{ getAudioBitrate(audio) }}</div>
        </div>
      </div>
      
      <div v-if="getSubtitles() !== null">
        <div class="subtitle-details"> Subtitles:
          <div v-for="subtitle in getSubtitles()" :key="subtitle.id">
            <div>{{ subtitle.language?.englishTitle || 'Unknown Language'}}</div>
          </div>
        </div>
      </div>

      <div class="path">Path: {{ movie.path }}</div>       

    <div :class="copyForm">
      <button @click="closeForm()">Close</button>
      <form @submit.prevent="copyMovie">
        <label for="destinationPath">Type:</label>
        <select v-model="destinationPath" required>
          <option value="" disabled>Select a type</option>
          <option v-for="source in sources" :key="source" :value="source.path">{{ source.title }}</option>
        </select>
          
        <button type="submit">Submit</button>
      </form>
    </div>

    <div :class="moveForm">
      <button @click="closeForm()">Close</button>
      <form @submit.prevent="moveMovie">
        <label for="destinationPath">Type:</label>
        <select v-model="destinationPath" required>
          <option value="" disabled>Select a type</option>
          <option v-for="source in sourcePaths()" :key="source" :value="source.path">{{ source.title }}</option>
        </select>
          
        <button type="submit">Submit</button>
      </form>
    </div>

    <div :class="renameForm">
      <button @click="closeForm()">Close</button>
      <form @submit.prevent="renameMovie">
        <input
          type="text"
          v-model="title"
          placeholder="Enter new title"
          required
        />
        <input
          type="number"
          v-model.number="year"
          placeholder="Enter new year"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>

    <div :class = "deleteForm">
      <p>Are you sure that you want to delete the movie?</p>
      <button @click="deleteMovie()">Yes</button>
      <button @click="closeForm()">No</button>
    </div>
  </div>
  </template>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rate-img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.rating {
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
}

.genre, .video, .audio {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.audio {
  background-color: #333;
}

.movie {
  display: flex;
  margin-top: 20px;
}

.poster {
  width: 250px;
  height: 350px;
  object-fit: cover;
}

.content-movie-details {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.contributors , .genres, .video-details, .audio-details, .audio-detail, .subtitle-details, .path, .modifications, .actors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  text-align: left;;
}

.audio-detail{
  background-color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contributors, .video-details, .audio-details, .subtitle-details, .actors {
  margin-top: 10px;
}

.contributor-post{
  width:50px;
}

.actors {
  display:contents;
  gap: 10px;
}

.person {
  display: flex;
  text-align: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100px;
  background-color: black;
}

.button, .delete-button {
  cursor: pointer;
  background-color: black;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.delete-button {
  background-color: red;
  color: white;
}

.button:hover, .delete-button:hover{
  background-color: #333;
}
</style>