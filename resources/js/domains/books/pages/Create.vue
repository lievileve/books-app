<script setup lang="ts">
import {ref} from 'vue';
import BookForm from '../components/BookForm.vue';
import {addBook} from '../store';
import type {Book} from '../store';
import listAllAuthors from '@/domains/authors/store';

const newBook = ref<Omit<Book, 'id'>>({
    title: '',
    author_id: 0,
});

const {authors} = listAllAuthors();

const header = 'Add New Book';

const handleNewBook = async (book: Omit<Book, 'id'>) => {
    try {
        await addBook(book);
    } catch (error) {
        console.error('Error adding the book:', error);
    }
};
</script>
<template>
    <BookForm :header="header" :book="newBook" @submit="handleNewBook" :authors="authors" />
</template>
