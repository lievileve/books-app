<script setup lang="ts">
import BookTable from '../components/BookTable.vue';
import listAllBooks from '../store';

const {books} = listAllBooks();

console.log(books);
</script>
<template>
    <table>
        <th>Title</th>
        <!-- <th>Author</th> -->

        <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <!-- <td>{{ book.author_id }}</td> -->
        </tr>
    </table>
    <!-- <BookTable v-model="allBooks" /> -->
</template>
