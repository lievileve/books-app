<script setup lang="ts">
import router from '@/router';
import { deleteBook, getBooksWithAuthors, listAllBooksWithAuthors, type Book } from '../store';
import { onMounted } from 'vue';

const { booksWithAuthors } = listAllBooksWithAuthors();

onMounted(() => {
    getBooksWithAuthors();
});

const editBook = (book: Book) => {
    router.push({ name: 'edit', params: { id: book.id } });
};

const deleteThis = async (bookId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
        try {
            await deleteBook(bookId);
            await getBooksWithAuthors();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
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
            <td>{{ book.title }}</td>
            <td>{{ book.authorName }}</td>
            <td><button type="button" @click="editBook(book)">Edit</button></td>
            <td><button type="button" @click="deleteThis(book.id)">Delete</button></td>
        </tr>
    </table>
</template>
