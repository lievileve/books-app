<script setup lang="ts">
import { useRoute } from 'vue-router';
import BookForm from '../components/BookForm.vue';
import { Book, bookStore } from '../store';
import { authorStore } from '@/domains/authors/store';
import router from '@/services/router';

bookStore.actions.getAll();
authorStore.actions.getAll();
const route = useRoute();

const header = 'Edit Book';
const currentBook = bookStore.getters.byId(+route.params.id)

const authors = authorStore.getters.all;

const handleUpdatedBook = async (book: Book) => {
    await bookStore.actions.update(book.id, book);
    router.push({path: '/'})
};

</script>

<template>
    <BookForm v-if="currentBook" :header="header" :book="currentBook" @submit="handleUpdatedBook" :authors="authors" />
</template>
