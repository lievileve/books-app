import axios from 'axios';
import {computed, ComputedRef, onMounted, ref} from 'vue';

export interface Author {
    id: number;
    name: string;
}

//Author-state
const authors = ref<Author[]>([]);

//Getters
const getAllAuthors = async () => {
    const {data} = await axios.get<Author[]>('api/authors');
    if (!data) return;
    authors.value = data;
};

const listAllAuthors = (): {authors: ComputedRef<Author[]>} => {
    onMounted(() => {
        getAllAuthors();
    });

    return {
        authors: computed(() => authors.value),
    };
};

export default listAllAuthors;

//Actions
