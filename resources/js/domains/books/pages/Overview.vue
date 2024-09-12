<script setup lang="ts">
// @ts-nocheck
import {  Book, bookStore} from '../store';
import { computed, onMounted, ref } from 'vue';
import { authorStore } from '@/domains/authors/store';
import { router } from '@/services/router';

bookStore.actions.getAll();
authorStore.actions.getAll();
const booksWithoutAuthors = bookStore.getters.all

const editBook = (book: Book) => {
    router.push({ name: 'books.edit', params: { id: book.id } });
};

const deleteThis = async (bookId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
        await bookStore.actions.deleteItemById(bookId);
        router.push({path: '/'})};};
</script>

<template>
    <table>
        <th>Title</th>
        <th>Author</th>
        <th>Edit Book</th>
        <th>Delete Book</th>

        <tr v-for="book in booksWithoutAuthors" :key="book.id">
            <td><a :href="'/books/' + book.id">{{ book.title }}</a></td>
            <td>{{ authorStore.getters.byId(book.author_id).value?.name }}</td>
            <td><button type="button" @click="editBook(book)">Edit</button></td>
            <td><button type="button" @click="deleteThis(book.id)">Delete</button></td>
        </tr>
    </table>
</template>
