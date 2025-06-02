<script>
import { defineComponent } from 'vue';
import SidebarLeftComponent from './components/SidebarLeftComponent.vue';
import TopComponent from './components/TopComponent.vue';
import MainComponent from './components/MainComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    SidebarLeftComponent,
    TopComponent,
    MainComponent
  }
});
</script>
<template>
<div class="app-container">
    
    <aside class="sidebar">
      <SidebarLeftComponent />
    </aside>
  
    <main>
      <aside class="dmenu">
       <TopComponent />
      </aside>
      <MainComponent />
    </main>

  </div>
</template>

<style scoped>
.app-container {
    max-width: 800px;
    float: left;
    margin-left: 250px;
    margin-top: 60px;
    
  }

  .sidebar {
    background: #1f1f1f;
    position:fixed;
    left: 20px;
    width: 250px;
    height: 95vh;
    top:50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .dmenu {
    
    position:fixed;
    top:0;
    margin-top:20px;
    left: 270px;
    text-align: left;
    width: 100%;
    padding :20px 0;
    background: #1f1f1f;
    height: 50px;
  }


@media screen and (max-width: 1250px) {
  .dmenu {
    all: unset;
  }
}
@media screen and (max-width: 980px) {

  .sidebar {
    display: none;
  }

  .app-container {
    margin-left: 0;
  }
}

</style>
