// @ts-nocheck
import { storeModuleFactory } from '@/services/store/factory';
import axios from 'axios';
import { ref} from 'vue';

export interface Review {
    id: number;
    book_id: number;
    title: string;
    body: string;
}

//State
export const reviewStore = storeModuleFactory('reviews');





