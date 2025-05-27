<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainComponent'
});
</script>

<template>
    <div>
        <RouterView name="main"/>
    </div>
</template>

<style scoped>
    .main-component {
        margin-top: 20px;
        padding: 20px;
        background-color: #282c34;
        color: white;
    }
    h1{
        color: aliceblue;
    }
</style>