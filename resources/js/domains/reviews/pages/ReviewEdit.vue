<script setup lang="ts">
import { Review, reviewStore } from '../store';

import { useRoute } from 'vue-router';
import ReviewForm from '../components/ReviewForm.vue';
import router from '@/services/router';

const route = useRoute();
const header = 'Edit Review';

reviewStore.actions.getAll();


const currentReview = reviewStore.getters.byId(+route.params.id);

const handleUpdatedReview = async (review: Review) => {
   await reviewStore.actions.update(review.id, review);
    router.push({        path: '/',    });
};
</script>
<template>
    <ReviewForm v-if="currentReview" :header="header" :review="currentReview" @submit="handleUpdatedReview" />
</template>