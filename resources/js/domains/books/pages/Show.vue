<script setup lang="ts">
import { useRoute } from 'vue-router';
import { findBookById, getAllBooks } from '../store';
import listAllAuthors, { findAuthorById, getAllAuthors } from '@/domains/authors/store';

const route = useRoute();

const currentBook = findBookById(Number(route.params.id));
const currentAuthor = findAuthorById(currentBook.author_id);

listAllAuthors;
getAllBooks();



</script>
<template>
    <h1 v-if="currentBook">Resources for {{ currentBook.title }} by {{ currentAuthor?.name }}
    </h1>
    <p>{{ currentBook }}</p>
    <p>{{ currentAuthor }}</p>
    <div v-for="review in reviews">
        <h2>{{ review.title }}</h2>
        <p>{{ review.body }}</p>
    </div>
</template>