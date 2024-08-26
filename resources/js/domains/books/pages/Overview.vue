<script setup lang="ts">
import listAllBooks from '../store';

const {books} = listAllBooks();
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
</template>
