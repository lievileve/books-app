<script setup lang="ts">
import { ref } from 'vue';
import { Author } from '../store'



const prop = defineProps({
    author: Object,
    header: String,
})

const singleAuthor = ref({ ...prop.author })

const emit = defineEmits<{ (e: 'submit', author: Author): void }>();

const handleSubmit = async () => {
    emit('submit', singleAuthor.value);
};

</script>
<template>
    <h1>{{ prop.header }}<br>
    </h1>
    <form @submit.prevent="handleSubmit">
        <label for="name">Name:</label>
        <br />
        <input type="text" id="name" v-model="singleAuthor.name" />

        <br />
        <button type="submit">Submit</button>
    </form>
</template>