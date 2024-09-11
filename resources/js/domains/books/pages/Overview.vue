<script setup lang="ts">
// @ts-nocheck
import {  Book, bookStore, deleteBook } from '../store';
import { computed, onMounted, ref } from 'vue';
import { authorStore, findAuthorById } from '@/domains/authors/store';
import { router } from '@/services/router';

bookStore.actions.getAll();
authorStore.actions.getAll();
const booksWithAuthors = computed(() => bookStore.getters.all.value)

const editBook = (book: Book) => {
    router.push({ name: 'books.edit', params: { id: book.id } });
};

//edit delete function to not use the old delete function from the store but the generic delete function from the store factory
const deleteThis = async (bookId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
        const response = await deleteBook(bookId);
    }
};
</script>
<template>
    <table>
        <th>Title</th>
        <th>Author</th>
        <th>Edit Book</th>
        <th>Delete Book</th>

        <tr v-for="book in booksWithAuthors" :key="book.id">
            <td><a :href="'/books/' + book.id">{{ book.title }}</a></td>
            <td>{{ findAuthorById(book.author_id)?.name }}</td>
            <td><button type="button" @click="editBook(book)">Edit</button></td>
            <td><button type="button" @click="deleteThis(book.id)">Delete</button></td>
        </tr>
    </table>
    <!-- <p v-if="message">{{ message }}</p> -->
</template>
