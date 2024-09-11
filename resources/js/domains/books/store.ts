// @ts-nocheck
import { storeModuleFactory } from '@/services/store/factory';
import axios from 'axios';
import {computed, ref} from 'vue';


export interface Book {
    id: number;
    title: string;
    author_id: number;
}

export const bookStore = storeModuleFactory('books');

//get rid of the store, getters and actions, get rid of everything except for the storeModuleFactory.


export const findBookById = (id: number) => computed(() => books.value.find(book => book.id == id));

//Actions

export const updateBook = async (book: Book) => {
    const response = await axios.put<{data: Book[]; message: string}>(`/api/books/${book.id}`, book);
    books.value = response.data.data;
    return response.data;
};

export const deleteBook = async (id: number) => {
    const response = await axios.delete<{data: Book[]; message: string}>(`/api/books/${id}`);
    books.value = response.data.data;
    return response.data;
};

//Old code
// export const allBooks = computed(() => books.value);
// export const getAllBooks = async () => {
//     const response = await axios.get<{data: Book[]}>('/api/books');
//     books.value = response.data.data;
// };
// export const allBooks = books;
// const books = ref<Book[]>([]);
// export const addBook = async (book: Book) => {
//     const response = await axios.post<{data: Book[]; message: string}>('api/books', book);
//     books.value = response.data.data;
//     return response.data;
// };
//State
// const books = computed(() => bookStore.getters.all.value)

//Getters
// await bookStore.actions.getAll();

// export const getAllBooks = books;