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
        const { data } = await axios.get<Book[]>('api/books');
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
    } catch (error) {
        console.error('Failed to add book:', error);
    }
};

export const listAllBooks = (): { books: ComputedRef<Book[]> } => {
    return {
        books: computed(() => books.value),
    };
};

export const findBook = () => {
    return {pickedBook, getBookById};
};

export const updateBook = async(book:Book): Promise<void> => {
    try {
        const { data } = await axios.put<Book>(`/api/books/${book.id}`, book);
        const index = books.value.findIndex(b => b.id === book.id);
        books.value[index] = data;
        } catch (error) {
        console.error('Failed to update book:', error);
        throw error; 
    }
}
    
