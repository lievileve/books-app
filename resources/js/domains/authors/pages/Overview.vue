<script setup lang="ts">
import { onMounted } from 'vue';
import listAllAuthors from '../store';

const { authors } = listAllAuthors();

onMounted(() => {
    listAllAuthors();
});

</script>
<template>
    <table>
        <th>Author</th>
        <tr v-for="author in authors" :key="author.id">
            <td>{{ author.name }}</td>
        </tr>
    </table>
</template>