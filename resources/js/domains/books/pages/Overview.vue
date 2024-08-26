<script setup lang="ts">
import listAllAuthors from '@/domains/authors/store';
import listAllBooks from '../store';

const {books} = listAllBooks();
const {authors} = listAllAuthors();
const getAuthorName = (authorId: number) => {
    const author = authors.value.find(author => author.id === authorId);
    return author ? author.name : 'Unknown';
};
</script>
<template>
    <table>
        <th>Title</th>
        <th>Author</th>

        <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ getAuthorName(book.author_id) }}</td>
        </tr>
    </table>
</template>
