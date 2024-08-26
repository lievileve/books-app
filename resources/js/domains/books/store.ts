import axios from 'axios';
import {computed, ComputedRef, onMounted, ref} from 'vue';

export interface Book {
    id: number;
    title: string;
    author_id: number;
}

//State
const books = ref<Book[]>([]);
const pickedBook = ref<Book | null>(null);

//Getters

const getAllBooks = async () => {
    const {data} = await axios.get<Book[]>('api/books');
    if (!data) return;
    books.value = data;
};

const listAllBooks = (): {books: ComputedRef<Book[]>} => {
    onMounted(() => {
        getAllBooks();
    });

    return {
        books: computed(() => books.value),
    };
};

export default listAllBooks;

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
    } catch (error) {
        console.error('Failed to add book:', error);
    }
};

export const findBook = () => {
    return {pickedBook, getBookById};
};
