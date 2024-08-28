<script setup lang="ts">
import { useRoute } from 'vue-router';
import BookForm from '../components/BookForm.vue';
import { Book, getBookById } from '../store';
import { onMounted, ref } from 'vue';

const route = useRoute();

const header = 'Edit Book';

const currentBook = ref({});

onMounted(() => {
    const bookId = Number(route.params.id); // Get the book ID from route params
    currentBook.value = getBookById(bookId); // Fetch the book details
    console.log(currentBook.value);
});


const handleUpdatedBook = async (book: Book) => {
    try {
        await updateBook(book); // Call the updateBook function from the store
        // You can add additional logic here, such as redirecting the user or showing a success message
    } catch (error) {
        console.error('Failed to update the book:', error);
    }
};
</script>

<template>
    <BookForm :header="header" :book="currentBook" @submit="handleUpdatedBook" :authors="authors" />
</template>
