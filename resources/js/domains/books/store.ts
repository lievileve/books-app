import router from '@/router';
import axios from 'axios';
import {computed, ComputedRef, ref} from 'vue';
import {Author} from '../authors/store';

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

        books.value = booksData;

        // Map through the books and add the author name
        booksWithAuthors.value = booksData.map((book: {author_id: any}) => {
            const author = authorsData.find((author: {id: any}) => author.id === book.author_id);
            return {
                ...book,
                authorName: author.name,
            };
        });
    } catch (error) {
        console.error('Error fetching books or authors:', error);
    }
};
export const getBookByIdWithAuthors = async (id: number): Promise<BookWithAuthor | null> => {
    try {
        if (booksWithAuthors.value.length === 0) {
            await getBooksWithAuthors();
        }

        const book = booksWithAuthors.value.find(book => book.id === id) || null;
        return book;
    } catch (error) {
        console.error('Error fetching book by ID with authors:', error);
        throw error;
    }
};

export const listAllBooksWithAuthors = (): {booksWithAuthors: ComputedRef<BookWithAuthor[]>} => {
    return {
        booksWithAuthors: computed(() => booksWithAuthors.value),
    };
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
    return {getBookByIdWithAuthors};
};

export const updateBook = async (book: Book): Promise<void> => {
    try {
        const {data} = await axios.put<{data: Book}>(`/api/books/${book.id}`, book);

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

export const deleteBook = async (id: number): Promise<void> => {
    try {
        await axios.delete(`/api/books/${id}`);

        const index = books.value.findIndex((book: Book) => book.id === id);

        if (index !== -1) {
            books.value.splice(index, 1);
            const authorIndex = booksWithAuthors.value.findIndex((book: Book) => book.id === id);
            if (authorIndex !== -1) {
                booksWithAuthors.value.splice(authorIndex, 1);
            }
        } else {
            console.warn(`Book with ID ${id} not found in the store.`);
        }
    } catch (error) {
        console.error('Failed to delete book:', error);
        throw error;
    }
};

//Old functions

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

// export const listAllBooks = (): {books: ComputedRef<Book[]>} => {
//     return {
//         books: computed(() => books.value),
//     };
// };
