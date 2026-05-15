import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from "./apiClient.js";
import type {HerramentalModelSchema, ApiError} from "../Validators/HerramentalEsp.js";


const stableQueryOptions = {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
} as const;
export const useHerramental = () => {
    const queryClient = useQueryClient();

    // ----READ (Get DropdownLists)----
    const useGetHerramentales = () =>
        useQuery<HerramentalModelSchema[], ApiError>({
            queryKey: ['herramentales'],
            queryFn: async () => {
                const {data} = await apiClient.get(`/api/herramental_especifico/${id}/`);
                return data;
            },
            });


    // ---- CREATE ----
const useCreateHerramental = () =>
    useMutation<HerramentalModelSchema, ApiError, Partial<HerramentalModelSchema>>({
        mutationFn: async (newHeramental) => {
            const {data} = await apiClient.post(`/api/herramental_especifico/${id}/`, newHeramental);
            return data;
        },
        onSuccess: () => {
            //Invalidates cache and listDropDown refresh automatically
            queryClient.invalidateQueries({queryKey: ['herramentales']});
        },
    });
//  ----UPDATE ----
    const useUpdateHerramental = ()=>
        useMutation<HerramentalModelSchema, ApiError, { id:number; data: Partial<HerramentalModelSchema>}>({
            mutationFn: async ({id, data}) => {
                const response = await apiClient.put(`/api/herramental_especifico/${id}/`, data);
                return response.data;
            },
            onSuccess: () =>
                queryClient.invalidateQueries({queryKey: ['herramentales']})
        })

    //---- DELETE ----
    const useDeleteHerramental = () =>
        useMutation<void,ApiError, number>({
            mutationFn: async (id) => {
                await apiClient.delete(`/api/herramental_especifico/${id}/`);
            },
            onSuccess: () =>
                queryClient.invalidateQueries({queryKey: ['herramentales']})
        })
//--------------------- UseGetLookups ----------------------------

        // Función auxiliar para asegurar que siempre devolvemos un Array
        const ensureArray = (response: any) => {
            // 1. Si es un array directo, lo devolvemos
            if (Array.isArray(response)) return response;
            // 2. Si es el formato de paginación de Django (DRF), devolvemos .results
            if (response && Array.isArray(response.results)) return response.results;
            // 3. Caso contrario, devolvemos array vacío para evitar que .map() falle
            return [];
        };
    const useGetLookups = () =>{
        return{
            tipos: useQuery({
                queryKey: ['tipos'],
                queryFn: () => apiClient.get('/api/tipo_herramental/').then(res => ensureArray(res.data))
            }),
            familias: useQuery({
                queryKey: ['familias'],
                queryFn: () => apiClient.get('/api/familia/').then(res => ensureArray(res.data))
            }),
            maquinas: useQuery({
                queryKey: ['maquinas'],
                queryFn: () => apiClient.get('/api/maquinas/').then(res => ensureArray(res.data))
            }),
            estanterias: useQuery({
                queryKey: ['estanterias'],
                queryFn: () => apiClient.get('/api/estanterias/').then(res => ensureArray(res.data))
            }),
        }
    }


    return {
        useGetLookups,
        useGetHerramentales,
        useCreateHerramental,
        useUpdateHerramental,
        useDeleteHerramental,
    }
}