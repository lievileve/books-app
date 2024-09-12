<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from 'vue';
import  { Author, authorStore} from '../store';
import router from '@/services/router';

const authors = authorStore.getters.all;

const editAuthor = (author: Author) => {
    router.push({ name: 'authors.edit', params: { id: author.id } });
};

const deleteThis = async (authorId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this author?');
    if (confirmed) {
       await authorStore.actions.deleteItemById(authorId);
       router.push({ path: '/authors'});
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
</template>