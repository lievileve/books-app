<script setup lang="ts">
import router from '@/router';
import listAllBooks from '../store';
import type {Book} from '../store';

const {books} = listAllBooks();

const editBook = (book: Book) => {
    router.push({name: 'edit', params: {id: book.id}});
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
            <td>{{ book.author.name }}</td>
            <!-- typescript error message hierboven, maar werkt wel. Nog aanpassen met computed property in store zodat naam aan id wordt gekoppeld?  -->
            <td><button type="button" @click="editBook(book)">Edit</button></td>
            <td><button>Delete</button></td>
        </tr>
    </table>
</template>
