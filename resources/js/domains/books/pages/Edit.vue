<script setup lang="ts">
import { useRoute } from 'vue-router';
import BookForm from '../components/BookForm.vue';
import { Book, bookStore, updateBook } from '../store';
import { authorStore } from '@/domains/authors/store';
import router from '@/services/router';
import { onMounted, ref } from 'vue';

bookStore.actions.getAll();
authorStore.actions.getAll();
const route = useRoute();

const header = 'Edit Book';
const currentBook = ref(null);

onMounted(async () => {
    currentBook.value = await bookStore.actions.getById(Number(route.params.id));
    console.log(await bookStore.actions.getById(Number(route.params.id)));
});
// const currentBook = bookStore.actions.getById(Number(route.params.id));


const authors = authorStore.getters.all;


const handleUpdatedBook = async (book: Book) => {
    const response = await updateBook(book);
    router.push({
        path: '/',
    });
};

</script>

<template>
    <BookForm v-if="currentBook" :header="header" :book="currentBook" @submit="handleUpdatedBook" :authors="authors" />
</template>
