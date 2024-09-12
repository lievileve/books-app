// @ts-nocheck
import { storeModuleFactory } from '@/services/store/factory';
import axios from 'axios';
import {computed, ComputedRef, ref} from 'vue';

export interface Author {
    id: number;
    name: string;
}

//Author-state
export const authorStore = storeModuleFactory('authors');


