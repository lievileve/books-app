
import axios from 'axios';
import {computed, ref} from 'vue';


export interface Book {
    id: number;
    title: string;
    author_id: number;
}

//State
const books = ref<Book[]>([]);
const bookStore = storeModuleFactory('books');

//Getters

export const allBooks = computed(() => books.value);

export const getAllBooks = async () => {
    const response = await axios.get<{data: Book[]}>('/api/books');
    books.value = response.data.data;
};

export const findBookById = (id: number) => computed(() => books.value.find(book => book.id == id));

//Actions

export const addBook = async (book: Book) => {
    const response = await axios.post<{data: Book[]; message: string}>('api/books', book);
    books.value = response.data.data;
    return response.data;
};

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
