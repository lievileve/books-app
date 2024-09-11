import { computed, ref } from 'vue';
import {getRequest, postRequest} from '../http/index'
// @ts-nocheck

export const storeModuleFactory = (moduleName: string) => {
    const state = ref({});

    const getters = {
        // Met "all" kunnen we de gegevens als computed value uit de state halen,
        // wat voor reactiviteit tussen componenten en state zorgt.
        all: computed(() => Object.values(state.value))
    };

    const setters = {
        // functie hieronder aangepaste versie omdat de oorspronkelijke functie bij initialiseren app errors gaf dat items.forEach geen functie is. 
        setAll: <T>(items: { data: T[] }) => {
                // console.log(items);
                items.data.forEach(item => {
                    state.value[item.id] = item;
                });
                // console.log(state.value);
        },
        setById: <T extends { id: number }>(item: T) => {
            state.value[item.id] = item;
        }
    };

    const actions = {
        getAll: async () => {
            // Simuleer een oproep naar een API, mbv de Axios facade
            const {data} = await getRequest(moduleName);
            // console.log(data);
            if(!data) return
            setters.setAll(data);
            // console.log(state.value);
        },
        astAll: async () => {
            // Simuleer een oproep naar een API, mbv de Axios facade
            const {data} = await postRequest(moduleName);
            if(!data) return
            setters.setAll(data);
        },
        create: async (item) => {
            //Post item functie
            const {data} = await postRequest(moduleName,item);
            if(!data) return
            setters.setAll(data);           
        },
        getById: async(id:number) => {
            const{data} = await getRequest(`${moduleName}/${id}`);
            console.log(data);
            if(!data) return
            setters.setById(data);
        }

    };
    
    return {
        getters,
        actions
    };
}







