import router from '@/router';
import axios from 'axios';
import {computed, ComputedRef, ref} from 'vue';

export interface Book {
    id?: number;
    title: string;
    author_id: number;
}

//State
const books = ref<Book[]>([]);
const pickedBook = ref<Book | null>(null);

//Getters

export const getAllBooks = async () => {
    try {
        const {data} = await axios.get<Book[]>('api/books');
        books.value = data;
    } catch (error) {
        console.error('Error fetching all books:', error);
    }
};

export const getBookById = async (id: number) => {
    try {
        const response = await axios.get(`/api/books/${id}`);
        pickedBook.value = response.data;
        return pickedBook.value;
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        throw error;
    }
};

//Actions

export const addBook = async (book: Omit<Book, 'id'>): Promise<void> => {
    try {
        const {data} = await axios.post<Book>('api/books', book);
        if (!data) return;
        books.value.push(data);
        // router.push('/');
        // <-hier gezet in de hoop dat ik laden van de Overview.vue kon vertragen tot de book array opnieuw geladen is. Nog geen succes.
    } catch (error) {
        console.error('Failed to add book:', error);
    }
};

export const listAllBooks = (): {books: ComputedRef<Book[]>} => {
    return {
        books: computed(() => books.value),
    };
};

export const findBook = () => {
    return {pickedBook, getBookById};
};

export const updateBook = async (book: Book): Promise<void> => {
    try {
        const {data} = await axios.put<{data: Book}>(`/api/books/${book.id}`, book);
        console.log(data);
        const index = books.value.findIndex(b => b.id === book.id);
        if (index !== -1) {
            books.value.splice(index, 1, data.data);
        } else {
            console.warn(`Book with ID ${book.id} not found in the store.`);
        }

        // router.push('/');
        // <-hier gezet in de hoop dat ik laden van de Overview.vue kon vertragen tot de book array opnieuw geladen is. Nog geen succes.
    } catch (error) {
        console.error('Failed to update book:', error);
        throw error;
    }
};
