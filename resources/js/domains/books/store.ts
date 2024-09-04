import axios from 'axios';
import {computed, ref} from 'vue';

export interface Book {
    id: number;
    title: string;
    author_id: number;
}

//State
const books = ref<Book[]>([]);

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
// export const findBook = () => {
//     return {getBookByIdWithAuthors};
// };

// export const getBooksWithAuthors = async () => {
//     const [booksResponse, authorsResponse] = await Promise.all([
//         axios.get<Book[]>('api/books'),
//         axios.get<Author[]>('api/authors'),
//     ]);

//     const booksData = booksResponse.data.data || booksResponse.data;
//     const authorsData = authorsResponse.data.data || authorsResponse.data;

//     books.value = booksData;

//     // Map through the books and add the author name
//     booksWithAuthors.value = booksData.map((book: {author_id: any}) => {
//         const author = authorsData.find((author: {id: any}) => author.id === book.author_id);
//         return {
//             ...book,
//             authorName: author.name,
//         };
//     });
// };

// export const getBookByIdWithAuthors = async (id: number): Promise<BookWithAuthor | null> => {
//     if (booksWithAuthors.value.length === 0) {
//         await getBooksWithAuthors();
//     }

//     const book = booksWithAuthors.value.find(book => book.id === id) || null;
//     return book;
// };
