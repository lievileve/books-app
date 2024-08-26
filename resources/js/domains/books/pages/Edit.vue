<script setup lang="ts">
import {useRoute} from 'vue-router';
import BookForm from '../components/BookForm.vue';
import {Book, findBook, getBookById} from '../store';
import {ref} from 'vue';

const route = useRoute();

const header = 'Edit Book';

const currentBook = ref({});

const {getBookById} = findBook();
currentBook.value = getBookById(route.params.id);
console.log(currentBook.value);

// const handleUpdatedBook = async (book: Book) => {
//     updateBook(book);
// };
</script>

<template>
    <BookForm :header="header" :book="currentBook" @submit="handleUpdatedBook" :authors="authors" />
</template>
