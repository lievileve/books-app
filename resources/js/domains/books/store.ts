import router from '@/router';
import axios from 'axios';
import {computed, ComputedRef, ref} from 'vue';
import listAllAuthors, {Author} from '../authors/store';

export interface Book {
    id?: number;
    title: string;
    author_id: number;
}

export interface BookWithAuthor extends Book {
    authorName?: string;
}

//State
const books = ref<Book[]>([]);
const pickedBook = ref<Book | null>(null);
const booksWithAuthors = ref<BookWithAuthor[]>([]);

//Getters
export const getBooksWithAuthors = async () => {
    try {
        const [booksResponse, authorsResponse] = await Promise.all([
            axios.get<Book[]>('api/books'),
            axios.get<Author[]>('api/authors'),
        ]);

        const booksData = booksResponse.data.data || booksResponse.data;
        const authorsData = authorsResponse.data.data || authorsResponse.data;

        // Map through the books and add the author name
        booksWithAuthors.value = booksData.map(book => {
            const author = authorsData.find(author => author.id === book.author_id);
            return {
                ...book,
                authorName: author ? author.name : 'Unknown Author',
            };
        });
    } catch (error) {
        console.error('Error fetching books or authors:', error);
    }
};

export const listAllBooksWithAuthors = (): {booksWithAuthors: ComputedRef<BookWithAuthor[]>} => {
    return {
        booksWithAuthors: computed(() => booksWithAuthors.value),
    };
};

// export const getAllBooks = async () => {
//     try {
//         const {data} = await axios.get<Book[]>('api/books');
//         console.log(data);
//         books.value = data;
//     } catch (error) {
//         console.error('Error fetching all books:', error);
//     }
// };

// export const getBookById = async (id: number) => {
//     try {
//         const bookResponse = await axios.get(`/api/books/${id}`);
//         const bookData = bookResponse.data.data || bookResponse.data;

//         const authorResponse = await axios.get<Author>(`/api/authors/${bookData.author_id}`);
//         const authorData = authorResponse.data.data || authorResponse.data;

//         pickedBook.value = {...bookData, authorName: authorData.name};
//         console.log(bookData);
//         // console.log(authorData);
//         // console.log(pickedBook.value);

//         return pickedBook.value;
//     } catch (error) {
//         console.error('Error fetching book by ID:', error);
//         throw error;
//     }
// };
export const getBookById = async (id: number) => {
    try {
        const bookResponse = await axios.get(`/api/books/${id}`);
        const bookData = bookResponse.data.data || bookResponse.data;

        // Extract author data from the nested object
        const authorName = bookData.author ? bookData.author.name : 'Unknown Author';

        // Combine the book data with the author's name
        pickedBook.value = {...bookData, authorName};

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

// export const listAllBooks = (): {books: ComputedRef<Book[]>} => {
//     return {
//         books: computed(() => books.value),
//     };
// };

export const findBook = () => {
    return {pickedBook, getBookById};
};

export const updateBook = async (book: Book): Promise<void> => {
    try {
        const {data} = await axios.put<{data: Book}>(`/api/books/${book.id}`, book);
        // console.log(data);
        const index = books.value.findIndex(b => b.id === book.id);
        if (index !== -1) {
            books.value.splice(index, 1, data.data);
        } else {
            console.warn(`Book with ID ${book.id} not found in the store.`);
        }
    } catch (error) {
        console.error('Failed to update book:', error);
        throw error;
    }
};
