// @ts-nocheck
import { storeModuleFactory } from '@/services/store/factory';
import axios from 'axios';
import {computed, ComputedRef, ref} from 'vue';

export interface Author {
    id: number;
    name: string;
}

//Author-state
export const authorStore = storeModuleFactory('authors');
const authors = computed(() => authorStore.getters.all.value)

// //Getters
// await authorStore.actions.getAll();

// export const getAllAuthors = authors

export const findAuthorById = (id: number) => {
    return authors.value.find(author => author.id === id);
};

// export default getAllAuthors;

//Actions

export const addAuthor = async (author: Author) => {
    const response = await axios.post<{data: Author[]; message: string}>('api/authors', author);
    authors.value = response.data.data;
    return response.data;
};

export const updateAuthor = async (author: Author) => {
    const response = await axios.put<{data: Author[]; message: string}>(`/api/authors/${author.id}`, author);
    authors.value = response.data.data;
    return response.data;
};

export const deleteAuthor = async (id: number) => {
    const response = await axios.delete<{data: Author[]; message: string}>(`/api/authors/${id}`);
    authors.value = response.data.data;
    return response.data;
};

//old code
// const authors = ref<Author[]>([]);
// export const getAllAuthors = async () => {
//     const response = await axios.get('/api/authors');
//     authors.value = response.data.data;
// };
// export const listAllAuthors = computed(() => authors.value);