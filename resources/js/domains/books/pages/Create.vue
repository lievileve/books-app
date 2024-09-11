<script setup lang="ts">
import { ref } from 'vue';
import BookForm from '../components/BookForm.vue';
import { bookStore } from '../store';
import type { Book } from '../store';
import { authorStore } from '@/domains/authors/store';
import router from '@/services/router';


const newBook = ref<Book>({
    id: 0,
    title: '',
    author_id: 0,
});

const authors = authorStore.getters.all;

const header = 'Add New Book';

const addBook = async (book: Book) => {
    await bookStore.actions.create(book);
    router.push({path: '/'});
}

</script>
<template>
    <BookForm :header="header" :book="newBook" @submit="addBook" :authors="authors" />
</template>
