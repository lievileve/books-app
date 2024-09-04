import axios from 'axios';
import {computed, ComputedRef, ref} from 'vue';

export interface Author {
    id: number;
    name: string;
}

//Author-state
const authors = ref<Author[]>([]);

//Getters
export const getAllAuthors = async () => {
    const response = await axios.get('/api/authors');
    authors.value = response.data.data;
};

export const listAllAuthors = computed(() => authors.value);

export const findAuthorById = (id: number) => {
    return authors.value.find(author => author.id === id);
};

export default listAllAuthors;

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
