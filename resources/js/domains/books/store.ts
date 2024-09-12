// @ts-nocheck
import { storeModuleFactory } from '@/services/store/factory';
import axios from 'axios';
import {computed, ref} from 'vue';


export interface Book {
    id: number;
    title: string;
    author_id: number;
}

export const bookStore = storeModuleFactory('books');