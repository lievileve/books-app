<script setup lang="ts">
import { onMounted, ref } from 'vue';
import listAllAuthors, { Author, deleteAuthor, getAllAuthors } from '../store';
import router from '@/router';

const authors = listAllAuthors;
const message = ref('');

getAllAuthors()

onMounted(() => {
    const queryMessage = router.currentRoute.value.query.message;
    if (queryMessage) {
        message.value = String(queryMessage);
        router.replace({ path: '/authors', query: {} });
    }
});

const editAuthor = (author: Author) => {
    router.push({ name: 'edit_author', params: { id: author.id } });
};

const deleteThis = async (authorId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this author?');

    if (confirmed) {
        const response = await deleteAuthor(authorId);
        message.value = response.message;
    }
};

</script>
<template>
    <table>
        <th>Author</th>
        <th>Edit</th>
        <th>Delete</th>
        <tr v-for="author in authors" :key="author.id">
            <td>{{ author.name }}</td>
            <td><button type="button" @click="editAuthor(author)">Edit</button></td>
            <td><button type="button" @click="deleteThis(author.id)">Delete</button></td>
        </tr>
    </table>
    <p v-if="message">{{ message }}</p>
</template>