<script setup lang="ts">
import router from '@/router';
import { getBooksWithAuthors, listAllBooksWithAuthors, type Book } from '../store';
import { onMounted } from 'vue';

const { booksWithAuthors } = listAllBooksWithAuthors();

onMounted(() => {
    getBooksWithAuthors();
});

const editBook = (book: Book) => {
    router.push({ name: 'edit', params: { id: book.id } });
};

const deleteBook = (book: Book) => { }

</script>
<template>
    <table>
        <th>Title</th>
        <th>Author</th>
        <th>Edit Book</th>
        <th>Delete Book</th>

        <tr v-for="book in booksWithAuthors" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.authorName }}</td>
            <td><button type="button" @click="editBook(book)">Edit</button></td>
            <td><button type="button" @click="deleteBook(book)">Delete</button></td>
        </tr>
    </table>
</template>
