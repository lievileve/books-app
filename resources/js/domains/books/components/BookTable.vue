<script setup>
const model = defineModel();
</script>

<template>
    <h1>Books</h1>
    <table>
        <th>Title</th>
        <th>Author</th>

        <tr v-for="book in model" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author_id }}</td>
        </tr>
    </table>
</template>
