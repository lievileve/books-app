import axios from 'axios';
import {computed, ComputedRef, onMounted, ref} from 'vue';

interface Book {
    id: number;
    title: string;
    author_id: number;
}

//Book-state
// const books = ref([]);
const books = ref<Book[]>([]);

//Getters
const getAllBooks = async () => {
    const {data} = await axios.get<Book[]>('api/books');
    if (!data) return;
    books.value = data;
};

// const listAllBooks = () => {
//     onMounted(() => {
//         getAllBooks();
//     });
//     return {
//         books: computed(() => books.value),
//     };
// };
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
