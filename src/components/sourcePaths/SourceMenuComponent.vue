<script>

</script>

<template>
    <div>
        <h2>Sources</h2>
            <div class="menu">
                <router-link to="/sources" class="link">Sources</router-link>
            </div>  
    </div>
</template>

<style scoped>

.menu{
  display: grid;
  float:left;
  text-align: left;;
}

.link {
text-decoration: none;
color: white;
font-size: 15px;
margin-left: 20px;
margin-right:20px;
}

.link:hover {
  color: #f0f0f0;
  font-weight: bold;
  border-bottom: 1px solid #f0f0f0;
}

</style>