<script setup lang="ts">
import router from '@/router';
import { enrichBooksWithAuthors, getAllBooks, listAllBooks, type Book } from '../store';
import listAllAuthors from '@/domains/authors/store';
import { onMounted } from 'vue';

const { books } = listAllBooks();
const { authors } = listAllAuthors();

const loadBooks = async () => {
    await getAllBooks();
    await enrichBooksWithAuthors();
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
        <th>Delete Book</th>

        <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.authorName }}</td>
            <!-- typescript error message hierboven, maar werkt wel. Nog aanpassen met computed property in store zodat naam aan id wordt gekoppeld?  -->
            <td><button type="button" @click="editBook(book)">Edit</button></td>
            <td><button>Delete</button></td>
        </tr>
    </table>
</template>
