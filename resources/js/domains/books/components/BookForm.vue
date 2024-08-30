<script setup lang="ts">
import { ref, watch } from 'vue';
import { Book, getAllBooks } from '../store';
import router from '@/router';

const prop = defineProps({
    book: Object,
    header: String,
    authors: Object,
});

const singleBook = ref(prop.book ? JSON.parse(JSON.stringify(prop.book)) : {});

// const singleBook = ref<Book | {}>(props.book ? JSON.parse(JSON.stringify(props.book)) : {}); <- alternatief, nog uitzoeken wat precies het verschil is. 

//suggestie hieronder van ChatGPT om te zorgen dat singleBook niet leeg is. 
watch(
    () => prop.book,
    (newBook) => {
        if (newBook) {
            singleBook.value = JSON.parse(JSON.stringify(newBook));
        }
    },
    { immediate: true } // This ensures the watcher runs immediately with the initial value
);

const emit = defineEmits<{ (e: 'submit', book: Book): void }>();

const handleSubmit = async () => {
    try {
        console.log(singleBook.value);
        await emit('submit', singleBook.value);


    } catch (error) {
        console.error('Failed to submit the book:', error);
    }
};
</script>

<template>
    <h1>{{ prop.header }}<br>
        <!-- {{ singleBook }}<br> -->
    </h1>
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
