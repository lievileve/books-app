<script setup lang="ts">
import router from '@/router';
import { allBooks, Book, deleteBook, getAllBooks } from '../store';
import { onMounted, ref } from 'vue';
import { findAuthorById, getAllAuthors } from '@/domains/authors/store';

const booksWithAuthors = allBooks;
const message = ref('');

onMounted(() => {
    getAllBooks();
    getAllAuthors();
    const queryMessage = router.currentRoute.value.query.message;
    if (queryMessage) {
        message.value = String(queryMessage);
        router.replace({ path: '/', query: {} });
    }
});

const editBook = (book: Book) => {
    router.push({ name: 'edit', params: { id: book.id } });
};

const deleteThis = async (bookId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
        const response = await deleteBook(bookId);
        message.value = response.message;
        await getAllBooks();
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
            <td>{{ findAuthorById(book.author_id)?.name }}</td>
            <td><button type="button" @click="editBook(book)">Edit</button></td>
            <td><button type="button" @click="deleteThis(book.id)">Delete</button></td>
        </tr>
    </table>
    <p v-if="message">{{ message }}</p>
</template>
