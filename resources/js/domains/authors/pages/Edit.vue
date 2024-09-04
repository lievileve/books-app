<script setup lang="ts">
import { useRoute } from 'vue-router';
import AuthorForm from '../components/AuthorForm.vue';
import { Author, findAuthorById, updateAuthor } from '../store';
import router from '@/router';

const route = useRoute();

const header = "Update Author in Database"
const currentAuthor = findAuthorById(Number(route.params.id));

const handleUpdatedAuthor = async (author: Author) => {
    const response = await updateAuthor(author);
    router.push({
        path: '/authors',
        query: { message: response.message }
    });
}
</script>

<template>
    <AuthorForm v-if="currentAuthor" :header="header" :author="currentAuthor" @submit="handleUpdatedAuthor" />
</template>