import { computed, ref } from 'vue';
import {deleteRequest, getRequest, postRequest, updateRequest} from '../http/index'
// @ts-nocheck

export const storeModuleFactory = (moduleName: string) => {
    const state = ref({});

    const getters = {
        // Met "all" kunnen we de gegevens als computed value uit de state halen,wat voor reactiviteit tussen componenten en state zorgt.
        all: computed(() => Object.values(state.value)),
        
        byId: (id: number) => computed(() => state.value[id]),

    };

    const setters = {
        // functie hieronder aangepaste versie omdat de oorspronkelijke functie bij initialiseren app errors gaf dat items.forEach geen functie is. 
        setAll: <T>(items: { data: T[] }) => {
                items.forEach(item => {
                    state.value[item.id] = item;
                });
        },
        setById: <T extends { id: number }>(item: T) => {
            state.value[item.id] = item;
        },
        deleteById: (id: number) => {
            delete state.value[id];
        }
    };

    const actions = {
        getAll: async () => {
            // Simuleer een oproep naar een API, mbv de Axios facade
            const {data} = await getRequest(moduleName);
            if(!data) return
            setters.setAll(data);
        },
        astAll: async () => {
            // Simuleer een oproep naar een API, mbv de Axios facade
            const {data} = await postRequest(moduleName);
            if(!data) return
            setters.setAll(data);
        },
        create: async (item:object) => {
            //Post item functie
            const {data} = await postRequest(moduleName,item);
            if(!data) return
            setters.setAll(data);           
        },
        getById: async(id:number) => {
            const{data} = await getRequest(`${moduleName}/${id}`);
            if(!data) return
            setters.setById(data);
            return data;
        },
        update: async (id: number, item:object) => {
            const { data } = await updateRequest(`${moduleName}/${id}`, item);
            if (!data) return;
            setters.setById(data);
            return data;
        },
        deleteItemById: async (id:number) => {
            const{data} = await deleteRequest(`${moduleName}/${id}`);
            if(!data) return
            setters.deleteById(id); 
        },


    };
    
    return {
        getters,
        actions
    };
}







