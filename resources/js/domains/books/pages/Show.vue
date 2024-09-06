<script setup lang="ts">
import { useRoute } from 'vue-router';
import { findBookById, getAllBooks } from '../store';
import { findAuthorById, getAllAuthors } from '@/domains/authors/store';
import { addReview, deleteReview, findReviewsByBookId, getAllReviews, Review } from '@/domains/reviews/store';
import { computed, onMounted, ref } from 'vue';
import router from '@/router';
import ReviewForm from '@/domains/reviews/components/ReviewForm.vue';

const route = useRoute();
const message = ref('');
const header = 'Write Review';
const currentBook = findBookById(Number(route.params.id));

const newReview = ref<Review>({
    id: 0,
    book_id: currentBook?.value?.id || 0,
    title: '',
    body: ''
});

const currentAuthor = computed(() => {
    if (!currentBook.value) return
    return findAuthorById(currentBook.value.author_id)
});

const reviews = computed(() => {
    if (!currentBook.value) return
    const filteredReviews = findReviewsByBookId(currentBook.value.id);
    return filteredReviews;

});
onMounted
{
    getAllBooks();
    getAllAuthors();
    getAllReviews();
}

const handleNewReview = async (review: Review) => {
    review.book_id = currentBook.value.id;
    const response = await addReview(review);
    router.push({
        path: '/',
        query: { message: response.message }
    });
}

const editReview = (review: Review) => {
    router.push({ name: 'edit_review', params: { id: review.id } })
}
const deleteThis = async (reviewId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this review?');
    if (confirmed) {
        const response = await deleteReview(reviewId);
        message.value = response.message;
        await getAllBooks();
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