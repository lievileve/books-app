import axios from 'axios';
import {computed, ComputedRef, onMounted, ref} from 'vue';

export interface Book {
    id: number;
    title: string;
    author_id: number;
}

//Book-state
const books = ref<Book[]>([]);

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

//Actions

export const addBook = async (book: Omit<Book, 'id'>): Promise<void> => {
    try {
        const {data} = await axios.post<Book>('api/books', book);
        books.value.push(data);
    } catch (error) {
        console.error('Failed to add book:', error);
    }
};
