<script setup lang="ts">
import { useRoute } from 'vue-router';
import AuthorForm from '../components/AuthorForm.vue';
import { Author, authorStore } from '../store';
import router from '@/services/router';


const route = useRoute();

const header = "Update Author in Database"
const currentAuthor = authorStore.getters.byId(+route.params.id);

const handleUpdatedAuthor = async (author: Author) => {
    const response = await authorStore.actions.update(author.id, author);
    router.push({
        path: '/authors',
        query: { message: response.message }
    });
}
</script>

<template>
    <AuthorForm v-if="currentAuthor" :header="header" :author="currentAuthor" @submit="handleUpdatedAuthor" />
</template>