<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
export default {
    setup() {
        const sources = ref([]);
        const path = ref('');
        const title = ref('');
        const type = ref('');
        const loading = ref(false);
        const sourceForm = ref('hidden');

        const createSource = async () => {
            try {
                const form = {
                    path: path.value,
                    title: title.value,
                    type: type.value
                }
                const response = await axios.post('http://localhost:8080/api/sources', form);
                sources.value.push(response.data);
                console.log('Created:', response.data);
                path.value = '';
                title.value = '';
                type.value = '';
            } catch (error) {
                console.error('Error creating source:', error);
                alert('Failed to create SourcePath.');
            }
            sourceForm.value = 'hidden';
        };

        onMounted(async () => {
            loading.value = true;
            try {
                const response = await axios.get('http://localhost:8080/api/sources');
                sources.value = response.data;
            } catch (error) {
                console.error('Error fetching sources:', error);
            } finally {
                loading.value = false;
            }
        });

        const openForm = () => {
            sourceForm.value = 'form';
        }

        const closeForm = () => {
            sourceForm.value = 'hidden';
        }

        return {
            sources,
            path,
            title,
            type,
            createSource,
            loading,
            sourceForm,
            openForm,
            closeForm,
        };
    }
}
</script>

<template>
    
    <div v-if="sources.length > 0">
        <h2>Sources</h2>
        <div v-if="loading" class="spinner"></div>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Path</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="source in sources" :key="source.id">
                    <td>{{ source.title }}</td>
                    <td>{{ source.path }}</td>
                    <td>{{ source.type }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <button @click="openForm">Create Source</button>
    
    <div :class="sourceForm">
        <button @click="closeForm">Close</button>
        <form @submit.prevent="createSource">
            <div>
                <label for="path">Path:</label>
                <input type="text" v-model="path" required />
            </div>
            <div>
                <label for="title">Title:</label>
                <input type="text" v-model="title" required />
            </div>
            <div>
                <label for="type">Type:</label>
                <select v-model="type" required>
                    <option value="" disabled>Select a type</option>
                    <option value="MOVIE">Movie</option>
                    <option value="TV_SHOW">Tv Shows</option>
                    <option value="MUSIC">Music</option>
                    <option value="PHOTO">Photos</option>
                    <option value="EBOOK">e-Books</option>
                </select>
            </div>
            <button type="submit">Create Source</button>
        </form>
    </div>     
</template>

<style scoped>
td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}
</style>