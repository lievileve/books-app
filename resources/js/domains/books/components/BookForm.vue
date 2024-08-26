<script setup lang="ts">
import router from '@/router';
import {ref} from 'vue';
import {Book} from '../store';

const prop = defineProps({
    book: Object,
    header: String,
    authors: Object,
});

const singleBook = ref<Omit<Book, 'id'>>({
    title: prop.book?.title || '',
    author_id: prop.book?.author_id || null,
});

const emit = defineEmits<{(e: 'submit', book: Omit<Book, 'id'>): void}>();

const handleSubmit = () => {
    emit('submit', singleBook.value);
    router.push('/');
};
</script>

<template>
    <h1>{{ prop.header }}</h1>
    <form @submit.prevent="handleSubmit">
        <label for="title">Title:</label>
        <br />
        <input type="text" id="title" v-model="singleBook.title" />
        <br />
        <label for="author">Author:</label>
        <br />
        <select id="author" v-model="singleBook.author_id">
            <option :value="author.id" v-for="author in authors" :key="author.id">
                {{ author.name }}
            </option>
        </select>

        <br />
        <button type="submit">Submit</button>
    </form>
</template>
