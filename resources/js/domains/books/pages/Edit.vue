<script setup lang="ts">
import { useRoute } from 'vue-router';
import BookForm from '../components/BookForm.vue';
import { Book, getBookById } from '../store';
import { onMounted, ref } from 'vue';
import listAllAuthors from '@/domains/authors/store';

const route = useRoute();

const header = 'Edit Book';

const currentBook = ref({});
const { authors } = listAllAuthors();

onMounted(async () => {
    const bookId = Number(route.params.id);
    currentBook.value = await getBookById(bookId);
    console.log(currentBook.value);
});


const handleUpdatedBook = async (book: Book) => {
    try {
        await updateBook(book); // Call the updateBook function from the store
    } catch (error) {
        console.error('Failed to update the book:', error);
    }
};
</script>

<template>
    <BookForm :header="header" :book="currentBook" @submit="handleUpdatedBook" :authors="authors" />
</template>
