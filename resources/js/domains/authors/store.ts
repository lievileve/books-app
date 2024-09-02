import axios from 'axios';
import {computed, ComputedRef, onMounted, ref} from 'vue';

export interface Author {
    id: number;
    name: string;
}

//Author-state
const authors = ref<Author[]>([]);

//Getters
const getAllAuthors = async () => {
    try {
        const response = await axios.get('/api/authors');
        authors.value = response.data.data;
    } catch (error) {
        console.error('Error fetching all authors:', error);
    }
};

export const listAllAuthors = (): {authors: ComputedRef<Author[]>} => {
    getAllAuthors();
    return {
        authors: computed(() => authors.value),
    };
};

export const findAuthorById = (id: number): Author | undefined => {
    return authors.value.find(author => author.id === id);
};

export default listAllAuthors;

//Actions
