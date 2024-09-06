import axios from 'axios';
import {computed, ref} from 'vue';

export interface Review {
    id: number;
    book_id: number;
    title: string;
    body: string;
}

//State

const reviews = ref<Review[]>([]);

//Getters
export const getAllReviews = async () => {
    const response = await axios.get('/api/reviews');
    reviews.value = response.data.data;
};

export const listAllReviews = computed(() => reviews.value);

export const findReviewById = (id: number) => {
    return reviews.value.find(review => review.id === id);
};

export const findReviewsByBookId = (book_id: number) => {
    return reviews.value.filter(review => review.book_id === book_id);
};

export default listAllReviews;

//Actions

export const addReview = async (review: Review) => {
    const response = await axios.post<{data: Review[]; message: string}>('/api/reviews', review);
    reviews.value = response.data.data;
    return response.data;
};

export const updateReview = async (review: Review) => {
    const response = await axios.put<{data: Review[]; message: string}>(`/api/reviews/${review.id}`, review);
    reviews.value = response.data.data;
    return response.data;
};

export const deleteReview = async (id: number) => {
    const response = await axios.delete<{data: Review[]; message: string}>(`/api/reviews/${id}`);
    reviews.value = response.data.data;
    return response.data;
};
