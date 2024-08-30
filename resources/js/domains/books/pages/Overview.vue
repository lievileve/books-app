<script setup lang="ts">
import router from '@/router';
import { getAllBooks, listAllBooks, type Book } from '../store';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const { books } = listAllBooks();

const loadBooks = async () => {
    await getAllBooks();
};
onMounted(loadBooks);



// Onderstaande geimplementeerd als suggestie van ChatGPT om te zorgen dat ik bij het opnieuw laden van mijn Overview alle data laad, maar dit heeft de issue dat 
// book.author.name na toevoegen of updaten van een boek undefined is niet opgelost. Daarom maar weer uitgecomment. Kan tzt weg als ik de oplossing heb. 
//const route = useRoute();

// watch(
//     () => route.path, // Watch for changes in the route path
//     async () => {
//         await loadBooks(); // Re-fetch data on route change
//     }
// );

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
