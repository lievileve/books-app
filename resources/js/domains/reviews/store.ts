import axios from 'axios';
import {computed, ref} from 'vue';

export interface Review {
    id: number;
    title: string;
    body: string;
}

//State

const reviews = ref({});

//Getters
export const getAllReviews = async () => {
    const response = await axios.get('/api/reviews');
    reviews.value = response.data.data;
};

export const listAllReviews = computed(() => reviews.value);

export const findReviewsById = (id: number) => {
    return reviews.value.find(review => review.id === id);
};

export default listAllReviews;
