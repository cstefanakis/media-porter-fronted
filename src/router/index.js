import { createRouter, createWebHistory } from 'vue-router'
// Movie components
import MovieComponent from '../components/movies/MovieComponent.vue'
import MovieDetailComponent from '../components/movies/MovieDetailsComponent.vue'
import MovieDownloadsComponent from '../components/movies/MovieDownloadsComponent.vue'
import MoviesMenuComponent from '../components/movies/MoviesMenuComponent.vue'
// Source components
import SourcePathComponent from '../components/sourcePaths/SourcePathComponent.vue'
import SourceMenuComponent from '../components/sourcePaths/SourceMenuComponent.vue'
// TvShows components
import TvShowsMenuComponent from '../components/tvShows/TvShowsMenuComponent.vue'
//Music components
import MusicMenuComponent from '../components/music/MusicMenuComponent.vue'
// Photos components
import PhotosMenuComponent from '../components/Photos/photosMenuComponent.vue'
// E-books components
import EbooksMenuComponent from '../components/ebooks/EbooksMenuComponent.vue'

const routes = [
      {
        path: '/',
        name: 'home',
        components: {
          main: MovieComponent,
          left: MoviesMenuComponent
        }
      },
      //Movies routers
      {
        path: '/movies',
        name: 'movies',
        components: {
          main: MovieComponent,
          left: MoviesMenuComponent
        }
      },
      {
        path: '/movies/:id',
        name: 'MovieDetails',
        components: {
          main:MovieDetailComponent,
          left: MoviesMenuComponent
        }
      },
      {
        path: '/from-path',
        name: 'from-path',
        components: {
          main: MovieDownloadsComponent,
          left: MoviesMenuComponent
        }
      },
      {
        path: '/movies-menu',
        name: 'movies-menu',
        components: {
          left: MoviesMenuComponent
        }
      },
      //Source routers
      {
        path: '/sources-menu',
        name: 'sources-menu',
        components: {
          left: SourceMenuComponent
        }
      },
      {
        path: '/sources',
        name: 'sources',
        components: {
          main: SourcePathComponent,
          left: SourceMenuComponent
        }
      },
      //TvShows routers
      {
        path: '/tv-shows-menu',
        name: 'tv-shows-menu',
        components: {
          left: TvShowsMenuComponent
        }
      },
      //Music routers
      {
        path: '/music-menu',
        name: 'music-menu',
        components: {
          left: MusicMenuComponent
        }
      },
      //Photos routers
      {
        path: '/photos-menu',
        name: 'photos-menu',
        components: {
          left: PhotosMenuComponent
        }
      },
      //e-books routers
      {
        path: '/ebooks-menu',
        name: 'ebooks-menu',
        components: {
          left: EbooksMenuComponent
        }
      }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
