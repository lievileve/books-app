<script setup lang="ts">
import { findReviewById, getAllReviews, Review, updateReview } from '../store';
import router from '@/router';
import { useRoute } from 'vue-router';
import ReviewForm from '../components/ReviewForm.vue';

const route = useRoute();
const header = 'Edit Review';

getAllReviews();

const currentReview = findReviewById(Number(route.params.id));

const handleUpdatedReview = async (review: Review) => {
    const response = await updateReview(review);
    router.push({
        path: '/',
        query: { message: response.message }
    });
};
</script>
<template>
    <ReviewForm v-if="currentReview" :header="header" :review="currentReview" @submit="handleUpdatedReview" />
</template>