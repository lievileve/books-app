<script setup lang="ts">
import router from '@/router';
import { getAllBooks, listAllBooks, type Book } from '../store';
import { onMounted } from 'vue';

const { books } = listAllBooks();

const loadBooks = async () => {
    await getAllBooks();
};
onMounted(loadBooks);

const editBook = (book: Book) => {
    router.push({ name: 'edit', params: { id: book.id } });
};

</script>
<template>
    <table>
        <th>Title</th>
        <th>Author</th>
        <th>Edit Book</th>
        <!-- <th>Delete Book</th> -->

        <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author.name }}</td>
            <td><button type="button" @click="editBook(book)">Edit</button></td>
            <!-- <td><button>Delete</button></td> -->
        </tr>
    </table>
</template>
