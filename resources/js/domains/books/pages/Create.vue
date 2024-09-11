<script setup lang="ts">
import { ref } from 'vue';
import BookForm from '../components/BookForm.vue';
import { addBook } from '../store';
import type { Book } from '../store';
import listAllAuthors from '@/domains/authors/store';
import router from '@/services/router';


const newBook = ref<Book>({
    id: 0,
    title: '',
    author_id: 0,
});

const authors = listAllAuthors;

const header = 'Add New Book';

const handleNewBook = async (book: Book) => {
    const response = await addBook(book);
    router.push({
        path: '/',
        query: { message: response.message }
    });
};


</script>
<template>
    <BookForm :header="header" :book="newBook" @submit="handleNewBook" :authors="authors" />
</template>
