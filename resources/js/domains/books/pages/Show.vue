<script setup lang="ts">

import { useRoute } from 'vue-router';
import { Review, reviewStore } from '@/domains/reviews/store';
import { computed, ref } from 'vue';
import router from '@/services/router';
import { bookStore } from '../store';
import { authorStore } from '@/domains/authors/store';
import ReviewForm from '@/domains/reviews/components/ReviewForm.vue';

const route = useRoute();
const header = 'Write Review';

const currentBook = bookStore.getters.byId(+route.params.id);
const currentAuthor = authorStore.getters.byId(currentBook.author_id);
console.log(currentBook.value);
console.log(currentAuthor.value);

const newReview = ref<Review>({
    id: 0,
    book_id: currentBook.id,
    title: '',
    body: ''
});

 const findReviewsByBookId = (book_id: number) => {
    return reviews.value.filter(review => review.book_id === book_id);
};


const reviews = computed(() => {
    if (!currentBook.value) return
    const filteredReviews = findReviewsByBookId(currentBook.value.id);
    return filteredReviews;

});

const handleNewReview = async (review: Review) => {
    review.book_id = currentBook.value.id;
   await reviewStore.actions.create(review);
    router.push({        path: '/'    });
}

const editReview = (review: Review) => {
    router.push({ name: 'reviews.edit', params: { id: review.id } })
}

const deleteThis = async (reviewId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this review?');
    if (confirmed) {
        await reviewStore.actions.deleteItemById(reviewId);
    }
}

const showForm = ref(false)
const toggleForm = () => {
    showForm.value = !showForm.value;
};

</script>
<template>
    <h1 v-if="currentBook">Reviews for {{ currentBook.title }} by {{ currentAuthor?.name }}
    </h1>
    <div v-if="reviews?.length === 0">
        <p>There are no reviews for this book yet. Have you considered writing one?</p>
    </div>
    <div v-else class="reviews-container">
        <div v-for="review in reviews" :key="review.id" class="review-box">
            <h2>{{ review.title }}</h2>
            <p>{{ review.body }}</p><br>
            <button type="button" @click="editReview(review)">Edit</button>
            <button type="button" @click="deleteThis(review.id)">Delete</button>
        </div>
    </div>
    <br>
    <button type="button" @click="toggleForm">{{ showForm ? 'Cancel' : 'Add Review' }}</button>

    <div v-if="showForm">
        <ReviewForm :header="header" :review="newReview" @submit="handleNewReview" />

    </div>
</template>
<style scoped="css">
.reviews-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.review-box {
    border: 1px solid black;
    padding: 16px;
    border-radius: 8px;
    width: 200px;
}
</style>