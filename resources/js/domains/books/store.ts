import axios from 'axios';
import {computed, ComputedRef, onMounted, ref} from 'vue';
import listAllAuthors, { Author, findAuthorById } from '../authors/store';

export interface Book {
    id?: number;
    title: string;
    author_id: number;
    authorName?: string;
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

// export const getAuthorById = async (id: number): Promise<Author | null> => {
//     try {
//         const response = await axios.get<Author>(`/api/authors/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching author by ID:', error);
//         return null;
//     }
// };

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

// Enrich books with author names using the Author store
export const enrichBooksWithAuthors = async () => {
    const { authors } = listAllAuthors(); // Make sure this is returning the correct authors list

    // Wait for the authors to be fetched
    while (authors.value.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Polling delay
    }

    for (const book of books.value) {
        const author = findAuthorById(book.author_id);
        book.authorName = author ? author.name : 'Unknown Author';
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

// export const updateBook = () => {
    
