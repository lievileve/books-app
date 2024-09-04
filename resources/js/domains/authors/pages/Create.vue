<script setup lang="ts">
import { ref } from 'vue';
import { addAuthor, Author } from '../store';
import router from '@/router';
import AuthorForm from '../components/AuthorForm.vue';


const header = "Add New Author to Database"
const newAuthor = ref<Author>({
    id: 0,
    name: '',
})

const handleNewAuthor = async (author: Author) => {
    const response = await addAuthor(author);
    router.push({
        path: '/authors',
        query: { message: response.message }
    });
}

</script>
<template>
    <AuthorForm :header="header" :author="newAuthor" @submit="handleNewAuthor" />
</template>