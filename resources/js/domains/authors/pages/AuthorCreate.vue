<script setup lang="ts">
import { ref } from 'vue';
import { Author, authorStore } from '../store';
import AuthorForm from '../components/AuthorForm.vue';
import router from '@/services/router';


const header = "Add New Author to Database"
const newAuthor = ref<Author>({
    id: 0,
    name: '',
})

const handleNewAuthor = async (author: Author) => {
    console.log(author.value)
    await authorStore.actions.create(author);
    router.push({ path: '/authors'});
}

</script>
<template>
    <AuthorForm :header="header" :author="newAuthor" @submit="handleNewAuthor" />
</template>