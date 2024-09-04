<script setup lang="ts">
import { useRoute } from 'vue-router';
import BookForm from '../components/BookForm.vue';
import { Book, findBookById, getAllBooks, updateBook } from '../store';
import listAllAuthors from '@/domains/authors/store';
import router from '@/router';

const route = useRoute();

const header = 'Edit Book';

const currentBook = findBookById(Number(route.params.id));
const authors = listAllAuthors;

getAllBooks()

const handleUpdatedBook = async (book: Book) => {
    const response = await updateBook(book);
    router.push({
        path: '/',
        query: { message: response.message }
    });
};

</script>

<template>
    {{ currentBook }}
    <BookForm v-if="currentBook" :header="header" :book="currentBook" @submit="handleUpdatedBook" :authors="authors" />
</template>
