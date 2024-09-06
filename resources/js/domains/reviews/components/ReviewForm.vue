<script setup lang="ts">
import { ref } from 'vue';
import { Review } from '../store';

const prop = defineProps({
    review: Object,
    header: String,
});

const singleReview = ref({ ...prop.review });

const emit = defineEmits<{ (e: 'submit', review: Review): void }>();

const handleSubmit = async () => {
    emit('submit', singleReview.value);
};

</script>
<template>
    <h2>{{ prop.header }}</h2>
    <form @submit.prevent="handleSubmit">
        <label for="title">Title:</label>
        <br />
        <input type="text" id="title" v-model="singleReview.title" />
        <br />
        <label for="body">Review:</label>
        <br />
        <input type="text" id="body" v-model="singleReview.body" />
        <br />
        <button type="submit">Submit</button>
    </form>
</template>
